package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.MenusDao;
import com.pm.entity.Menus;

public class MenusDaoImpl implements MenusDao{
	
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void saveMenus(Menus menus) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(menus);
	}

	@Override
	public void deleteMenus(Menus menus) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(menus);
	}

	@Override
	public List<Menus> findAllMenus() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from Menus";
		@SuppressWarnings("unchecked")
		List<Menus> menuss = session.createQuery(sql).list();
		return menuss;
	}

	@Override
	public Menus findByMenusId(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from Menus where menu_id='"+id+"'";
		Menus menus = (Menus) session.createQuery(sql).uniqueResult();
		return menus;
	}

}
