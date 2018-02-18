package com.pm.action;

import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.AdminAccess;
import com.pm.entity.Page;
import com.pm.service.AdminAccessService;

public class AdminAccessAction extends ActionSupport{
	private AdminAccess aac;
	private List<AdminAccess> aacs;
	private AdminAccessService aacService;
	private int id;
	private int page; //第几页
    private Page pageBean;
	
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
	public AdminAccess getAac() {
		return aac;
	}
	public void setAac(AdminAccess aac) {
		this.aac = aac;
	}
	public List<AdminAccess> getAacs() {
		return aacs;
	}
	public void setAacs(List<AdminAccess> aacs) {
		this.aacs = aacs;
	}
	
	public AdminAccessService getAacService() {
		return aacService;
	}
	public void setAacService(AdminAccessService aacService) {
		this.aacService = aacService;
	}
	public String findAccessPageList() {
		aacs = aacService.findAllAccess();
        pageBean = aacService.queryForPage(8, page);
        return SUCCESS;
    }
	
	public String findAllAdminAccess(){
		aacs = aacService.findAllAccess();
		if(aacs==null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String deleteAccess() throws Exception{
		aac = aacService.findById(id);
		aacService.deleteAccess(aac);
		pageBean = aacService.queryForPage(8, page);
		return SUCCESS;
	}
	
	public String updateAccess() throws Exception{
		AdminAccess aa = new AdminAccess();
		aa = aacService.findById(aac.getAccess_id());
		aa.setAccess_name(aac.getAccess_name());
		aacs = aacService.findAllAccess();
		return SUCCESS;
	}
	
	public String findByAccessId() throws Exception{
		aac = aacService.findById(id);
		if(aac==null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String saveAccess() throws Exception{
		aac.setAccess_name(aac.getAccess_name());
		aacService.saveAccess(aac);
		pageBean = aacService.queryForPage(8, page);
		return SUCCESS;
	}
}
