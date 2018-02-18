package com.pm.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.pm.dao.NewsDao;
import com.pm.entity.News;

public class NewsDaoImpl implements NewsDao{
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}


	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override
	public void saveNews(News news) {
		Session session = this.sessionFactory.getCurrentSession();
		session.save(news);
	}


	@Override
	public List<News> findAllNews() {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from News where is_show=0";
		@SuppressWarnings("unchecked")
		List<News> news = session.createQuery(sql).list();
		return news;
	}


	@Override
	public News findNewsById(int id) {
		Session session = this.sessionFactory.getCurrentSession();
		String sql = " from News where id="+id;
		News news = (News) session.createQuery(sql).uniqueResult();
		return news;
	}


	@Override
	public void updateNew(News news) {
		Session session = this.sessionFactory.getCurrentSession();
		session.update(news);
	}


	@Override
	public void deleteNews(News news) {
		Session session = this.sessionFactory.getCurrentSession();
		session.delete(news);
	}

	//分页查询
	@SuppressWarnings("unchecked")
	@Override
	public List<News> queryForPage(String hql, int offset, int length) {
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
