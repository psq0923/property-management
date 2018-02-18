package com.pm.action;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.AdminUser;
import com.pm.entity.Page;
import com.pm.entity.Salary;
import com.pm.service.AdminUserService;
import com.pm.service.SalaryService;

public class SalaryAction extends ActionSupport{
	private String message;
	private Salary salary;
	private int id;
	private List<Salary> salarys;
 	private SalaryService salaryService;
 	private int page; //第几页
    private Page pageBean;
    private AdminUser au;
    private List<AdminUser> adminusers;
    private AdminUserService adminUserService;
    
	public AdminUserService getAdminUserService() {
		return adminUserService;
	}

	public void setAdminUserService(AdminUserService adminUserService) {
		this.adminUserService = adminUserService;
	}

	public AdminUser getAu() {
		return au;
	}

	public void setAu(AdminUser au) {
		this.au = au;
	}

	public List<AdminUser> getAdminusers() {
		return adminusers;
	}

	public void setAdminusers(List<AdminUser> adminusers) {
		this.adminusers = adminusers;
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

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	public Salary getSalary() {
		return salary;
	}
	public void setSalary(Salary salary) {
		this.salary = salary;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public List<Salary> getSalarys() {
		return salarys;
	}
	public void setSalarys(List<Salary> salarys) {
		this.salarys = salarys;
	}
	public SalaryService getSalaryService() {
		return salaryService;
	}
	public void setSalaryService(SalaryService salaryService) {
		this.salaryService = salaryService;
	}
	
	public String findSalaryPageList() {
		adminusers = adminUserService.findAllAdminUsers();
        pageBean = salaryService.queryForPage(8, page,"");
        HttpSession session = ServletActionContext. getRequest().getSession();
        session.setAttribute("pageSize", pageBean.getPageSize());
        session.setAttribute("currentPage", pageBean.getCurrentPage());
        return SUCCESS;
    }
	
	public String findAllSalary() throws Exception{
		System.out.println("进入findAllSalary()");
		salarys = salaryService.findAllSalary();
		if(salarys == null){
			return ERROR;
		}
		return SUCCESS;
	}
	public String delete() throws Exception{
		System.out.println("进入delete()");
		salary = salaryService.findById(id);
		salaryService.deleteSalary(salary);
		adminusers = adminUserService.findAllAdminUsers();
		pageBean = salaryService.queryForPage(8, page,"");
		return SUCCESS;
	}
	public String save() throws Exception {
		if(salaryService.Check(salary.getAdmin_id())==true)
		{
			return ERROR;
		}
		/*Date time=new java.sql.Date(new java.util.Date().getTime());*/
		Date time= new java.sql.Date(new java.util.Date().getTime());
		System.out.println("-------"+time);
		salary.setAdmin_id(salary.getAdmin_id());
		salary.setSalary(salary.getSalary());
		salary.setGrant_time(time);
		salary.setStatus(salary.getStatus());
		
		salaryService.save(salary);
		adminusers = adminUserService.findAllAdminUsers();
		pageBean = salaryService.queryForPage(8, page,"");
		return SUCCESS;
	}
	public String update() throws Exception{
		Salary s = new Salary();
		Date time= new java.sql.Date(new java.util.Date().getTime());
		System.out.println("-------"+time);
	/*	salary = salaryService.findById(id);*/
		s = salaryService.findById(salary.getAdmin_id());
		
		s.setAdmin_id(salary.getAdmin_id());
		s.setSalary(salary.getSalary());
		s.setStatus(salary.getStatus());
		s.setGrant_time(time);
		salaryService.updateSalary(s);
		adminusers = adminUserService.findAllAdminUsers();
		pageBean = salaryService.queryForPage(8, page,"");
		return SUCCESS;
	}
	public String findById() throws Exception{
		salary =salaryService.findById(id);
		au = adminUserService.findAdminById(id);
		if(salary == null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String findAdminName() throws Exception{
		adminusers = adminUserService.findAllAdminUsers();
		return SUCCESS;
	}
}
