package com.pm.dao.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;

import com.pm.dao.AdminUsersDao; 
import com.pm.entity.AdminUser;     

public class AdminUserDaoImpl implements AdminUsersDao{

	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public AdminUser login(AdminUser auser) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from AdminUser where status=0 and username='" +auser.getUsername()+ "' and password='"+auser.getPassword()+"'";
		auser = (AdminUser) session.createQuery(sql).uniqueResult();
		if(auser!=null){
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session1 = request.getSession();
			session1.setAttribute("admin_id", auser.getId());
		}
		return auser;
	}
	
	@Override
	public List<AdminUser> findAllAdminUsers() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from AdminUser";
		@SuppressWarnings("unchecked")
		List<AdminUser> auser = session.createQuery(sql).list();
		return auser;
	}
	
	@Override
	public List<AdminUser> findAllAdminUsersId() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " select id,username from AdminUser";
		//@SuppressWarnings("unchecked")
		List<AdminUser> auser = session.createQuery(sql).list();
		return auser;
	}

	@Override
	public AdminUser findAdminById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from AdminUser where id="+id;
		AdminUser auser = (AdminUser) session.createQuery(sql).uniqueResult();
		return auser;
	}

	@Override
	public void updateAdminUsers(AdminUser au) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(au);
	}

	@Override
	public void deleteAdminUser(AdminUser au) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(au);
	}

	@Override
	public void saveAdmin(AdminUser auser) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(auser);
	}
	
	//分页查询
	@SuppressWarnings("unchecked")
	@Override
	public List<AdminUser> queryForPage(String hql, int offset, int length) {
		Session session = this.sessionFactory.getCurrentSession();
		Query q = session.createQuery(hql);
		q.setFirstResult(offset);
		q.setMaxResults(length);
		return q.list();
	}

	//总记录条数
	@Override
	public int getCount(String hql) {
		Query q = sessionFactory.getCurrentSession().createQuery(hql);
		return Integer.parseInt(q.list().get(0).toString());
	}

	@Override
	public AdminUser findAdminById(String username) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from AdminUser where username="+username;
		AdminUser auser = (AdminUser) session.createQuery(sql).uniqueResult();
		return auser ;
	}

}
