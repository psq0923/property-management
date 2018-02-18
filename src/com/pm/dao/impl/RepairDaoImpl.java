package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.RepairDao;
import com.pm.entity.Repair;
import com.pm.util.HibernateUtil;

public class RepairDaoImpl implements RepairDao {
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void save(Repair repair) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(repair);
	}
	@Override
	public void delete(Repair r) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(r);
	}

	@Override
	public void update(Repair r) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(r);
	}

	

	@Override
	public Repair findById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Repair where id="+id;
		Repair repair = (Repair) session.createQuery(sql).uniqueResult();
		
		return repair;
	}

	@Override
	public List<Repair> findAllRepairs() {
		
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from Repair";
	    
		/*@SuppressWarnings("unchecked")*/
		List<Repair> repairs = session.createQuery(sql).list();
		return repairs;
	}

}
