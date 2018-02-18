package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.UserDao;
import com.pm.entity.User;

public class UserDaoImpl implements UserDao{
	
	SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public List<User> findAllUser() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from User";
		@SuppressWarnings("unchecked")
		List<User> users = session.createQuery(sql).list();
		return users;
	}

	@Override
	public User findById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from User where id="+id;
		User user = (User) session.createQuery(sql).uniqueResult();
		return user;
	}

	@Override
	public void updateUsers(User u) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(u);
	}

	@Override
	public void deleteUser(User u) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(u);
	}
	
	//分页查询
		@SuppressWarnings("unchecked")
		@Override
		public List<User> queryForPage(String hql, int offset, int length) {
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
		public User login(User u) {
			Session session = this.sessionFactory.getCurrentSession();
			String sql = "from User where status = 0 and username='" + u.getUsername()
					+ "' and password='" + u.getPassword() + "'";
			User user = (User) session.createQuery(sql).uniqueResult();
			return user;
		}

		@Override
		public boolean CheckUser(String username, String pass) {
			Session session = this.sessionFactory.getCurrentSession();
			String sql = "from User where username='"+username+"'and password='"+pass+"'";
			User user= (User) session.createQuery(sql).uniqueResult();
			System.out.println(user);
			if(user==null){
				return false;
			}
			else
				return true;
		}

		@Override
		public void save(User u) {
			Session session = this.sessionFactory.getCurrentSession();
			session.save(u);
			
		}

}
