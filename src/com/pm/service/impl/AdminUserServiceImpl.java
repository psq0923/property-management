package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.AdminUsersDao;
import com.pm.entity.AdminUser;
import com.pm.entity.Page;
import com.pm.service.AdminUserService;

public class AdminUserServiceImpl implements AdminUserService {
	
	private AdminUsersDao adminUserDao;

	public AdminUsersDao getAdminUserDao() {
		return adminUserDao;
	}

	public void setAdminUserDao(AdminUsersDao adminUserDao) {
		this.adminUserDao = adminUserDao;
	}

	@Override
	public AdminUser login(AdminUser auser) {
		auser = adminUserDao.login(auser);
		return auser;
	}

	@Override
	public List<AdminUser> findAllAdminUsers() {
		List<AdminUser> au = adminUserDao.findAllAdminUsers();
		return au;
	}

	@Override
	public AdminUser findAdminById(int id) {
		AdminUser au = adminUserDao.findAdminById(id);
		return au;
	}

	@Override
	public void updateAdminUsers(AdminUser au) {
		adminUserDao.updateAdminUsers(au);
	}

	@Override
	public void deleteAdminUser(AdminUser au) {
		adminUserDao.deleteAdminUser(au);
	}

	@Override
	public void saveAdmin(AdminUser auser) {
		adminUserDao.saveAdmin(auser);
	}
	
	@Override
	public Page queryForPage(int pageSize, int page,String name) {
		String hql = "";
		if(name.equals("") || name==null){
			hql = "select count(*) from AdminUser";
		}else{
			hql = "select count(*) from AdminUser where username like '%"+name+"%'";
		}
		int count = adminUserDao.getCount(hql); // 总记录数
		int totalPage = Page.countTotalPage(pageSize, count); // 总页数
		int offset = Page.countOffset(pageSize, page); // 当前页开始记录
		int length = pageSize; // 每页记录数
		int currentPage = Page.countCurrentPage(page);
		List<AdminUser> list;
		if(name.equals("") || name==null){
			list = adminUserDao.queryForPage("from AdminUser where username like '%"+name+"%'", offset, length); // 该分页的记录
		}else{
			list = adminUserDao.queryForPage("from AdminUser where username like '%"+name+"%'", offset, length); // 该分页的记录
		}
		HttpSession session = ServletActionContext. getRequest().getSession();
		if(list!=null&&list.size()>0){
			session.setAttribute("adminUser_list", list);
		}else{
			session.removeAttribute("adminUser_list");
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

	@Override
	public List<AdminUser> findAllAdminUsersId() {
		List<AdminUser> aus = adminUserDao.findAllAdminUsersId();
		return aus;
	}

}
