package com.pm.dao;

import java.util.List;

import com.pm.entity.AdminUser;

public interface AdminUsersDao {
	
	/*分页查询*/
	public List<AdminUser> queryForPage(String hql,int offset,int length);
	     
	/*总记录条数*/
	public int getCount(String hql);

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
	
	/*登录*/
	public AdminUser login(AdminUser auser);
	
	public AdminUser findAdminById(String username);
	
	public List<AdminUser> findAllAdminUsersId();
}
