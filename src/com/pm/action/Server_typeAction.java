package com.pm.action;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Page;
import com.pm.entity.Server_type;
import com.pm.service.Server_typeService;

public class Server_typeAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Server_type server_type;
	private int id;
	private List<Server_type> server_types;
	private Server_typeService server_typeService;
	private String ser_type;
	private String charge_type;
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

	public Server_type getServer_type() {
		return server_type;
	}

	public void setServer_type(Server_type server_type) {
		this.server_type = server_type;
	}

	public List<Server_type> getServer_types() {
		return server_types;
	}

	public void setServer_types(List<Server_type> server_types) {
		this.server_types = server_types;
	}

	public Server_typeService getServer_typeService() {
		return server_typeService;
	}

	public void setServer_typeService(Server_typeService server_typeService) {
		this.server_typeService = server_typeService;
	}

	public String getSer_type() {
		return ser_type;
	}

	public void setSer_type(String ser_type) {
		this.ser_type = ser_type;
	}

	public String getCharge_type() {
		return charge_type;
	}

	public void setCharge_type(String charge_type) {
		this.charge_type = charge_type;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String execute() throws Exception {

		// user.setUid(new Random().nextInt(100)); 获取0~100的随机数
		// String username = new
		// String(user.getUname().getBytes("ISO-8859-1"),"utf-8");
		System.out.println("Charge_type   " + server_type.getCharge_type());
		System.out.println("getCharge_sta   " + server_type.getCharge_sta());

		if (server_typeService.Check(server_type.getSer_type(), server_type.getCharge_type()) == true) {
			// validate();//this.message = "该服务类型已经存在！";
			return ERROR;
		} else {
			server_type.setSer_type(server_type.getSer_type());
			server_type.setCharge_type(server_type.getCharge_type());
			server_type.setCharge_sta(server_type.getCharge_sta());
			if(server_type!=null){
			server_typeService.save(server_type);
			 pageBean = server_typeService.queryForPage(8, page,"");
			return SUCCESS;
			}
			else 
				return ERROR;
		}

	}

	public String delete() throws Exception {
		server_type = server_typeService.findById(id);
		server_typeService.delete(server_type);
		 pageBean = server_typeService.queryForPage(8, page,"");
		return SUCCESS;
	}

	public String update() throws Exception {
		// 更新的对象必须是持久化的对象
		System.out.println("更新的对象必须是持久化的对象");
		Server_type u = new Server_type();
		u = server_typeService.findById(server_type.getServer_id());
		u.setSer_type(server_type.getSer_type());
		u.setCharge_type(server_type.getCharge_type());
		u.setCharge_sta(server_type.getCharge_sta());
		server_typeService.update(u);
		 pageBean = server_typeService.queryForPage(8, page,"");
		return SUCCESS;
	}

	public String findAllserver_types() throws Exception {
		System.out.println("action");
		server_types = server_typeService.findAllServer_type();
		System.out.println("findAllServer_type "+server_types);
		if (server_types == null) {
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String findServerTypePageList() {
        pageBean = server_typeService.queryForPage(8, page,"");
        HttpSession session = ServletActionContext. getRequest().getSession();
        session.setAttribute("pageSize", pageBean.getPageSize());
        session.setAttribute("currentPage", pageBean.getCurrentPage());
        return SUCCESS;
    }

	public String findTypeByName() throws Exception{
		//aus = auss.findAllAdminUsers();
		pageBean = server_typeService.queryForPage(8, page,server_type.getCharge_type());
		if(pageBean == null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	/*
	 * //@SkipValidation
	 * 
	 * @Override public void validate() {
	 * 
	 * if("".equals(user.getName().trim())){ this.addFieldError("usernameError",
	 * "鐢ㄦ埛鍚嶄笉鑳戒负绌猴紒"); } if(user.getPassword().length()<6){
	 * this.addFieldError("pwdError", "该服务类型已经存在，请选择其他的类型！");
	 * 
	 * }
	 */

}
