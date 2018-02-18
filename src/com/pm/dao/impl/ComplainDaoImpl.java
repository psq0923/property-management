package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.ComplainDao;

import com.pm.entity.Complain;

import com.pm.util.HibernateUtil;

public class ComplainDaoImpl implements ComplainDao {
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void save(Complain complain) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(complain);
	}

	/*@Override
	public Complain findById(int user_id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from User where user_id=" + user_id;
		Complain  complain  = (Complain) session.createQuery(sql).uniqueResult();
		return complain;
	}*/

}
