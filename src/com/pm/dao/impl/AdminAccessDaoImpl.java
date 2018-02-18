package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.AdminAccessDao;
import com.pm.entity.AdminAccess;

public class AdminAccessDaoImpl implements AdminAccessDao{

	private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public List<AdminAccess> findAllAccess() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from AdminAccess";
		@SuppressWarnings("unchecked")
		List<AdminAccess> aac = session.createQuery(sql).list();
		return aac;
	}

	@Override
	public void saveAccess(AdminAccess aac) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(aac);
	}

	@Override
	public void deleteAccess(AdminAccess aac) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(aac);
	}

	@Override
	public void updateAccess(AdminAccess aac) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(aac);
	}

	@Override
	public AdminAccess findById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String hql = " from AdminAccess where access_id='"+id+"'";
		AdminAccess aa = (AdminAccess) session.createQuery(hql).uniqueResult();
		return aa;
	}
	
	//分页查询
		@SuppressWarnings("unchecked")
		@Override
		public List<AdminAccess> queryForPage(String hql, int offset, int length) {
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

}
