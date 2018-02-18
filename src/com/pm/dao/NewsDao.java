package com.pm.dao;

import java.util.List;

import com.pm.entity.News;

public interface NewsDao {
	/*发布新闻*/
	public void saveNews(News news);
	
	/*查询所有新闻*/
	public List<News> findAllNews();
	
	/*查询某个新闻*/
	public News findNewsById(int id);
	
	/*修改新闻*/
	public void updateNew(News news);
	
	/*删除新闻*/
	public void deleteNews(News news);
	
	/*分页查询*/
	public List<News> queryForPage(String hql,int offset,int length);
	     
	/*总记录条数*/
	public int getCount(String hql);
}
