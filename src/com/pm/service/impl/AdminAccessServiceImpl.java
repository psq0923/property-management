package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.AdminAccessDao;
import com.pm.entity.AdminAccess;
import com.pm.entity.Page;
import com.pm.service.AdminAccessService;

public class AdminAccessServiceImpl implements AdminAccessService{

	private AdminAccessDao aaDao;
	
	public AdminAccessDao getAaDao() {
		return aaDao;
	}

	public void setAaDao(AdminAccessDao aaDao) {
		this.aaDao = aaDao;
	}

	@Override
	public List<AdminAccess> findAllAccess() {
		System.out.println(123);
		List<AdminAccess> aac = aaDao.findAllAccess();
		return aac;
	}

	@Override
	public void saveAccess(AdminAccess aac) {
		aaDao.saveAccess(aac);
	}

	@Override
	public void deleteAccess(AdminAccess aac) {
		aaDao.deleteAccess(aac);
	}

	@Override
	public void updateAccess(AdminAccess aac) {
		aaDao.updateAccess(aac);
	}

	@Override
	public AdminAccess findById(int id) {
		AdminAccess aa = aaDao.findById(id);
		return aa;
	}
	
	@Override
	public Page queryForPage(int pageSize, int page) {
		String hql = "select count(*) from AdminAccess ";
		
		int count = aaDao.getCount(hql); // 总记录数
		int totalPage = Page.countTotalPage(pageSize, count); // 总页数
		int offset = Page.countOffset(pageSize, page); // 当前页开始记录
		int length = pageSize; // 每页记录数
		int currentPage = Page.countCurrentPage(page);
		List<AdminAccess> list = aaDao.queryForPage("from AdminAccess", offset, length); // 该分页的记录
		
		HttpSession session = ServletActionContext. getRequest().getSession();
		if(list!=null&&list.size()>0){
			session.setAttribute("access_list", list);
		}else{
			session.removeAttribute("access_list");
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
