package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.DetailDao;
import com.pm.entity.Detail;
import com.pm.entity.News;


public class DetailDaoImpl implements DetailDao{
    private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void save(Detail d) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(d);
		
	}

	@Override
	public void delete(Detail d) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(d);
		
	}

	@Override
	public void update(Detail d) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(d);
		
	}


	@Override
	public Detail findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Detail> findAllDetails() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from Detail";
		@SuppressWarnings("unchecked")
		List<Detail> details = session.createQuery(sql).list();
		return details;
	}
}
