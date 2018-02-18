package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.BuildingDao;
import com.pm.entity.AdminUser;
import com.pm.entity.Building;
import com.pm.entity.News;
import com.pm.util.HibernateUtil;

@SuppressWarnings("unchecked")
public class BuildingDaoImpl implements BuildingDao{

    private SessionFactory sessionFactory;


     public SessionFactory getSessionFactory() {
	     return sessionFactory;
    } 

     public void setSessionFactory(SessionFactory sessionFactory) {
	 this.sessionFactory = sessionFactory;
}

     @Override
    public void save(Building b) {
	System.out.println("添加action");
	Session session = sessionFactory.getCurrentSession();
	session.save(b);
}

    @Override
    public void delete(Building b) {
	    SessionFactory sf = HibernateUtil.getSessionFactory();
	    Session session = sf.getCurrentSession();
	    session.beginTransaction();
	    session.delete(b);
	    session.getTransaction().commit();
	
      }

          @Override
   public void update(Building b) {
	   SessionFactory sf = HibernateUtil.getSessionFactory();
	   Session session = sf.getCurrentSession();
	   session.beginTransaction();
	   session.update(b);
	   session.getTransaction().commit();
	
   }

     @Override
       public List<Building> findAllBuilding() {
	      SessionFactory sf = HibernateUtil.getSessionFactory();
	      Session session = sf.getCurrentSession();
	      session.beginTransaction();
	      String sql = "from Building";
	      List<Building> buildings = session.createQuery(sql).list();
	      session.getTransaction().commit();
	     return buildings;
}
     @Override
     public List<Building> findAllBuilding2() {
	      SessionFactory sf = HibernateUtil.getSessionFactory();
	      Session session = sf.getCurrentSession();
	      session.beginTransaction();
	      String sql = "select building_id,building_name from  Building";
	      List<Building> buildings = session.createQuery(sql).list();
	      session.getTransaction().commit();
	     return buildings;
}
       @Override
         public Building findById(int id) {
	         SessionFactory sf = HibernateUtil.getSessionFactory();
	         Session session = sf.getCurrentSession();
	         session.beginTransaction();
	         String sql = "from Building where building_id="+id;
	         Building building = (Building) session.createQuery(sql).uniqueResult();
	         session.getTransaction().commit();
	         return building;
       }
       
	     //分页查询
	   	@Override
	   	public List<Building> queryForPage(String hql, int offset, int length) {
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
