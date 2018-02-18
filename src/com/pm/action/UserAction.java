package com.pm.action;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Page;
import com.pm.entity.User;
import com.pm.service.UserService;

public class UserAction extends ActionSupport{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private User user;
	private List<User> users;
	private UserService userService;
	private int id;
	private int page; //第几页
    private Page pageBean;
    
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setUsers(List<User> users) {
		this.users = users;
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
	
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
	public String findUsersPageList() {
        pageBean = userService.queryForPage(4, page,"");
        HttpSession session = ServletActionContext. getRequest().getSession();
        session.setAttribute("pageSize", pageBean.getPageSize());
        session.setAttribute("currentPage", pageBean.getCurrentPage());
        return SUCCESS;
    }
	
	
	public String queryById() throws Exception{
		user = userService.findById(id);
		if(user==null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String updateUsers() throws Exception{
		User u = new User();
		u = userService.findById(user.getUser_id());
		u.setUsername(user.getUsername());
		u.setPassword(user.getPassword());
		u.setMobile(user.getMobile());
		u.setBuilding_id(user.getBuilding_id());
		u.setFloor_num(user.getFloor_num());
		u.setRoom_num(user.getRoom_num());
		u.setStatus(user.getStatus());
		//int status = user.getStatus();
		userService.updateUsers(u);
		pageBean = userService.queryForPage(4, page,"");
		return SUCCESS;
	}
	
	public String deleteUser() throws Exception{
		user = userService.findById(id);
		userService.deleteUser(user);
		pageBean = userService.queryForPage(4, page,"");
		return SUCCESS;
	}
	
	public String findUsersByName() throws Exception{
		pageBean = userService.queryForPage(4, page,user.getUsername());
		if(pageBean == null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	@Override
	public String execute() throws Exception {
		//如果该用户已经存在！，return ERROR;
		if (userService.CheckUser(user.getUsername(),user.getPassword())==true&&user!=null) {
			//validate();//this.message = "该服务类型已经存在！";
			return ERROR;
		}
		
		user.setUser_id(user.getUser_id());
		user.setUsername(user.getUsername());
		System.out.println(user.getUsername());
		user.setPassword(user.getPassword());
		user.setMobile(user.getMobile());
		user.setBuilding_id(user.getBuilding_id());
		user.setFloor_num(user.getFloor_num());
		user.setRoom_num(user.getRoom_num());
		Date date = new Date();
		user.setTime(date);
		userService.save(user);
		return SUCCESS;
		
	}
	
	public String login() throws Exception {
		user = userService.login(user);
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		if (user != null) {
			session.setAttribute("user_id", user.getUser_id());
			session.setAttribute("username", user.getUsername());
			return SUCCESS;
		} else {

			return ERROR;
		}
	}
	
}
