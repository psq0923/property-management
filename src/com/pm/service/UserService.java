package com.pm.service;

import java.util.List;

import com.pm.entity.Page;
import com.pm.entity.User;

public interface UserService {
	
	/*查询所有住户*/
	public List<User> findAllUser();
	
	/*查询一个住户*/
	public User findById(int id);
	
	/*修改住户*/
	public void updateUsers(User u);
	
	/*删除住户*/
	public void deleteUser(User u);
	
	public Page queryForPage(int pageSize, int currentPage,String username);
	
	public void save(User u);
	
	public User login(User u);
	
	public boolean CheckUser(String username, String pass);
}
