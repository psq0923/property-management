package com.pm.service;

import java.util.List;

import com.pm.entity.News;
import com.pm.entity.Page;

public interface NewsService {
	
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
	
	public Page queryForPage(int pageSize, int currentPage,String title);
}
