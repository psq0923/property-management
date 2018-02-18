package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.Server_typeDao;
import com.pm.entity.News;
import com.pm.entity.Server_type;
import com.pm.util.HibernateUtil;

public class Server_typeDaoImpl implements Server_typeDao {

	private SessionFactory sessionFactory;
	
	
	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void save(Server_type u) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(u);
	}

	@Override
	public void delete(Server_type u) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(u);	
	}

	@Override
	public void update(Server_type u) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(u);
		
		
	}

	@Override
	public List<Server_type> findAllServer_type() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Server_type";
		List<Server_type> server_types = session.createQuery(sql).list();
		return server_types;
	}

	@Override
	public Server_type findById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Server_type where server_id="+id;
		Server_type type = (Server_type) session.createQuery(sql).uniqueResult();
		return type;
	}

	/*@Override
	public Server_type Check(Server_type server_type) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Server_type where ser_type='"+server_type.getSer_type()+"'and charge_type='"+server_type.getCharge_type()+"'";
		Server_type server= (Server_type) session.createQuery(sql).uniqueResult();
		return server;
	}
*/
	@Override
	public boolean Check(String server_type, String charge_type) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = "from Server_type where ser_type='"+server_type+"'and charge_type='"+charge_type+"'";
		Server_type server= (Server_type) session.createQuery(sql).uniqueResult();
		System.out.println(server);
		if(server==null){
			return false;
		}
		else
			return true;
	}
	
	//分页查询
		@SuppressWarnings("unchecked")
		@Override
		public List<Server_type> queryForPage(String hql, int offset, int length) {
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
