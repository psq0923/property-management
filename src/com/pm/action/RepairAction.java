package com.pm.action;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Goods;
import com.pm.entity.Repair;
import com.pm.entity.User;
import com.pm.service.GoodsService;
import com.pm.service.RepairService;
import com.pm.service.UserService;

public class RepairAction extends ActionSupport {

	private Goods goods;
   private List<Repair> repairs;
   private List<User> users;
   private List<Goods> good;
   private UserService userService;
   private GoodsService goo;
	private Repair repair;
	private User user;
	private int id;
	private ShowRepairAction show_info;
	
	public ShowRepairAction getShow_info() {
		return show_info;
	}

	public void setShow_info(ShowRepairAction show_info) {
		this.show_info = show_info;
	}


	private RepairService repairService;
	
	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}



	public GoodsService getGoo() {
		return goo;
	}

	public void setGoo(GoodsService goo) {
		this.goo = goo;
	}

	public Goods getGoods() {
		return goods;
	}

	public void setGoods(Goods goods) {
		this.goods = goods;
	}

	public List<Repair> getRepairs() {
		return repairs;
	}

	public void setRepairs(List<Repair> repairs) {
		this.repairs = repairs;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<Goods> getGood() {
		return good;
	}

	public void setGood(List<Goods> good) {
		this.good = good;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	/*public RepairAction(Repair repair, User user, RepairService repairService) {
		super();
		this.repair = repair;
		this.user = user;
		this.repairService = repairService;
	}
*/
	public Repair getRepair() {
		return repair;
	}

	public void setRepair(Repair repair) {
		this.repair = repair;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public RepairService getRepairService() {
		return repairService;
	}

	public void setRepairService(RepairService repairService) {
		this.repairService = repairService;
	}

	@Override
	public String execute() throws Exception {
        System.out.println("进入 RepairAction  ");
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		int user_id=(Integer) session.getAttribute("user_id");
		Date date = new Date();// 创建一个时间对象，获取到当前的时间
		System.out.println(" RepairAction  " +session.getAttribute("user_id"));
		repair.setRepair_time(date);
		repair.setUser_id(user_id);
		//repair.setGoods_id(3);
		repair.setRemark(repair.getRemark());
		repairService.save(repair);
		return SUCCESS;
	}
	
	public String xianshi() throws Exception{
		repair = repairService.findById(id);
		return INPUT;
	}
	
	public String repairupdate() throws Exception{
		Date time= new java.sql.Date(new java.util.Date().getTime());
		Repair r= new Repair();
		r= repairService.findById(repair.getId());
		r.setUser_id(repair.getUser_id());
		r.setGoods_id(repair.getGoods_id());
		r.setRepair_time(repair.getRepair_time());
		r.setRemark(repair.getRemark());
		r.setStatus(repair.getStatus());
		repairService.update(r);
		repairs = repairService.findAllRepairs();
		//show_info.findAllShowRepair();
		return LOGIN;
	}
	
	public String findAllGoods() throws Exception{
		System.out.println("action");
		good = goo.findAllGoods();
		
		if(good == null){
			return ERROR;
		}
		return SUCCESS;
	}
	
	public String findAllUser() throws Exception{
		System.out.println("action");
		users = userService.findAllUser();
		
		if(users == null){
			return ERROR;
		}
		return SUCCESS;
	}
	

public String findAllRepair() throws Exception{
	System.out.println("action");
	repairs = repairService.findAllRepairs();
	
	if(repairs == null){
		return ERROR;
	}
	return SUCCESS;
}
}
