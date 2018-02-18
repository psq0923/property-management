package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.NewsDao;
import com.pm.entity.News;
import com.pm.entity.Page;
import com.pm.service.NewsService;

public class NewsServiceImpl implements NewsService{

	private NewsDao newsDao;
	
	public NewsDao getNewsDao() {
		return newsDao;
	}

	public void setNewsDao(NewsDao newsDao) {
		this.newsDao = newsDao;
	}

	@Override
	public void saveNews(News news) {
		newsDao.saveNews(news);
	}

	@Override
	public List<News> findAllNews() {
		return newsDao.findAllNews();
	}

	@Override
	public News findNewsById(int id) {
		News news = newsDao.findNewsById(id);
		return news;
	}

	@Override
	public void updateNew(News news) {
		newsDao.updateNew(news);
	}

	@Override
	public void deleteNews(News news) {
		newsDao.deleteNews(news);
	}

	@Override
	public Page queryForPage(int pageSize, int page,String title) {
		String hql = "";
		if(title.equals("") || title==null){
			hql = "select count(*) from News ";
		}else{
			hql = "select count(*) from News where title like '%"+title+"%'";
		}
		
		int count = newsDao.getCount(hql); // 总记录数
		int totalPage = Page.countTotalPage(pageSize, count); // 总页数
		int offset = Page.countOffset(pageSize, page); // 当前页开始记录
		int length = pageSize; // 每页记录数
		int currentPage = Page.countCurrentPage(page);
		List<News> list;
		if(title.equals("") || title==null){
			list = newsDao.queryForPage("from News", offset, length); // 该分页的记录
		}else{
			list = newsDao.queryForPage("from News where title like '%"+title+"%'", offset, length); // 该分页的记录
		}
		
		HttpSession session = ServletActionContext. getRequest().getSession();
		if(list!=null&&list.size()>0){
			session.setAttribute("news_list", list);
		}else{
			session.removeAttribute("news_list");
		}
		// 把分页信息保存到Bean中
		Page pageBean = new Page();
		pageBean.setPageSize(pageSize);
		pageBean.setCurrentPage(currentPage);
		pageBean.setAllRow(count);
		pageBean.setTotalPage(totalPage);
		pageBean.setList(list);
		pageBean.init();
		return pageBean;
	}
}
