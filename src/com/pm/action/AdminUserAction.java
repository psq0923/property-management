package com.pm.action;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.AdminAccess;
import com.pm.entity.AdminUser;
import com.pm.entity.Page;
import com.pm.entity.Salary;
import com.pm.service.AdminAccessService;
import com.pm.service.AdminUserService;
import com.pm.service.SalaryService;

public class AdminUserAction extends ActionSupport{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private AdminUser au;
	private AdminUserService adminUserService;
	private List<AdminUser> adminusers;
	private int id;
	private int page; //第几页
    private Page pageBean;
    private AdminAccessService aacService;
    private List<AdminAccess> aas;
    
	public AdminUserService getAdminUserService() {
		return adminUserService;
	}
	public void setAdminUserService(AdminUserService adminUserService) {
		this.adminUserService = adminUserService;
	}
	public List<AdminUser> getAdminusers() {
		return adminusers;
	}
	public void setAdminusers(List<AdminUser> adminusers) {
		this.adminusers = adminusers;
	}
	public AdminAccessService getAacService() {
		return aacService;
	}
	public void setAacService(AdminAccessService aacService) {
		this.aacService = aacService;
	}
	public List<AdminAccess> getAas() {
		return aas;
	}
	public void setAas(List<AdminAccess> aas) {
		this.aas = aas;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public Page getPageBean() {
		return pageBean;
	}
	public void setPageBean(Page pageBean) {
		this.pageBean = pageBean;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public AdminUser getAu() {
		return au;
	}
	public void setAu(AdminUser au) {
		this.au = au;
	}
	
	
	public String findAdminPageList() {
		aas = aacService.findAllAccess();
        pageBean = adminUserService.queryForPage(8, page,"");
        HttpSession session = ServletActionContext. getRequest().getSession();
        session.setAttribute("pageSize", pageBean.getPageSize());
        session.setAttribute("currentPage", pageBean.getCurrentPage());
        return SUCCESS;
    }
	
	public String findAdminAll() throws Exception{
		adminusers = adminUserService.findAllAdminUsers();
		if(adminusers==null){
			return ERROR;
		}else{
			return SUCCESS;
		}
	}
	
	public String findAllAdminUsersId() throws Exception{
		System.out.println("8888");
		adminusers = adminUserService.findAllAdminUsersId();
		System.out.println("测试js"+adminusers);
		if(adminusers==null){
		
			return ERROR;
		}else{
		
			System.out.println("存在admin");
			return SUCCESS;
		}
	}
	
	public String findAdminById() throws Exception{
		aas = aacService.findAllAccess();
		au = adminUserService.findAdminById(id);
		if(au==null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String updateAdminUsers() throws Exception{
		AdminUser u = new AdminUser();
		u = adminUserService.findAdminById(id);
		u.setUsername(au.getUsername());
		u.setPassword(au.getPassword());
		u.setEmail(au.getEmail());
		u.setAccess_id(au.getAccess_id());
		u.setStatus(au.getStatus());
		adminUserService.updateAdminUsers(u);
		aas = aacService.findAllAccess();
		pageBean = adminUserService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String deleteAdminUser() throws Exception{
		au = adminUserService.findAdminById(id);
		adminUserService.deleteAdminUser(au);
		aas = aacService.findAllAccess();
		pageBean = adminUserService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String saveAdminUser() throws Exception{
		au.setUsername(au.getUsername());
		au.setPassword(au.getPassword());
		au.setEmail(au.getEmail());
		au.setAccess_id(au.getAccess_id());
		au.setStatus(au.getStatus());
		aas = aacService.findAllAccess();
		adminUserService.saveAdmin(au);
		pageBean = adminUserService.queryForPage(8, page,"");
		return SUCCESS;
	}
	
	public String findAdminUsersByName() throws Exception{
		aas = aacService.findAllAccess();
		pageBean = adminUserService.queryForPage(8, page,au.getUsername());
		if(pageBean == null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	
}
