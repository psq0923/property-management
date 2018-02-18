package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.classic.Session;

import com.pm.dao.SalaryDao;
import com.pm.entity.News;
import com.pm.entity.Salary;
import com.pm.util.HibernateUtil;

public class  SalaryDaoImpl implements SalaryDao{
private SessionFactory sessionFactory;
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public List<Salary> findAllSalary() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Salary";
		List<Salary> salarys = session.createQuery(sql).list();
		return salarys;
	}

	@Override
	public void updateSalary(Salary s) {
		Session session = this.sessionFactory.getCurrentSession();
			session.update(s);
	}

	@Override
	public void deleteSalary(Salary s) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(s);
	}
	@Override
	public Salary findById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Salary where admin_id="+id;
		Salary salary = (Salary) session.createQuery(sql).uniqueResult();
		return salary;
	}
	
	@Override
	public void save(Salary s) {
		Session session = this.sessionFactory.getCurrentSession();
     	session.save(s);
	}
	@Override
	public boolean Check(int admin_id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Salary where admin_id='"+admin_id+"'";
		Salary salary= (Salary) session.createQuery(sql).uniqueResult();
		System.out.println(salary);
		if(salary==null){
			return false;
		}
		else
			return true;
	}
	
	//分页查询
		@SuppressWarnings("unchecked")
		@Override
		public List<Salary> queryForPage(String hql, int offset, int length) {
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

