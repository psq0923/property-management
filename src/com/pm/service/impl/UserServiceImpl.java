package com.pm.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.pm.dao.UserDao;
import com.pm.entity.Page;
import com.pm.entity.User;
import com.pm.service.UserService;

public class UserServiceImpl implements UserService{
	private UserDao userDao;

	public UserDao getUserDao() {
		return userDao;
	}

	public void setUserDao(UserDao userDao) {
		this.userDao = userDao;
	}

	@Override
	public List<User> findAllUser() {
		List<User> user = userDao.findAllUser();
		return user;
	}

	@Override
	public User findById(int id) {
		User user = userDao.findById(id);
		return user;
	}

	@Override
	public void updateUsers(User u) {
		userDao.updateUsers(u);
	}

	@Override
	public void deleteUser(User u) {
		userDao.deleteUser(u);
	}
	
	@Override
	public Page queryForPage(int pageSize, int page,String username) {
		String hql = "";
		if(username.equals("") || username==null){
			hql = "select count(*) from User";
		}else{
			hql = "select count(*) from User where username like '%"+username+"%'";
		}
		
		int count = userDao.getCount(hql); // 总记录数
		int totalPage = Page.countTotalPage(pageSize, count); // 总页数
		int offset = Page.countOffset(pageSize, page); // 当前页开始记录
		int length = pageSize; // 每页记录数
		int currentPage = Page.countCurrentPage(page);
		List<User> list;
		if(username.equals("") || username==null){
			list = userDao.queryForPage("from User", offset, length); // 该分页的记录
		}else{
			list = userDao.queryForPage("from User where username like '%"+username+"%'", offset, length); // 该分页的记录
		}
		
		HttpSession session = ServletActionContext. getRequest().getSession();
		if(list!=null&&list.size()>0){
			session.setAttribute("users_list", list);
		}else{
			session.removeAttribute("users_list");
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
	public void save(User u) {
		userDao.save(u);
	}

	@Override
	public User login(User u) {
		return userDao.login(u);
	}

	@Override
	public boolean CheckUser(String username, String pass) {
		return userDao.CheckUser(username, pass);
	}

}
