package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.GoodsDao;
import com.pm.entity.Goods;
import com.pm.entity.News;


public class GoodsDaoImpl implements GoodsDao {
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	@Override
	public void saveGoods(Goods g) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(g);
	}

	@Override
	public List<Goods> findAllGoods() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql ="select goods_id,goods_name from Goods";
		//@SuppressWarnings("unchecked")
		List<Goods> goods = session.createQuery(sql).list();
		return goods;
	}

	@Override
	public void deleteGoods(Goods g) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(g);
		
	}

	@Override
	public void updateGoods(Goods g) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(g);
		
	}

	@Override
	public Goods findByIdGoods(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql ="from Goods where goods_id="+id;
		Goods good = (Goods) session.createQuery(sql).uniqueResult();
		return good;
	}
	@Override
	public List<Goods> findAllGoods2() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql ="from Goods";
		@SuppressWarnings("unchecked")
		List<Goods> goods = session.createQuery(sql).list();
		return goods;
	}
	
}
