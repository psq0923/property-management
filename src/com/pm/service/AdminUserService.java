package com.pm.service;

import java.util.List;

import com.pm.entity.AdminUser;
import com.pm.entity.Page;

public interface AdminUserService {
	
	public Page queryForPage(int pageSize, int currentPage,String name);
	
	/*查询所有员工*/
	public List<AdminUser> findAllAdminUsers();
	
	/*查询一个员工*/
	public AdminUser findAdminById(int id);
	
	/*修改员工*/
	public void updateAdminUsers(AdminUser au);
	
	/*删除员工*/
	public void deleteAdminUser(AdminUser au);
	
	/*添加员工*/
	public void saveAdmin(AdminUser auser);
	
	public List<AdminUser> findAllAdminUsersId();
	
	/*登录*/
	public AdminUser login(AdminUser auser);
}
