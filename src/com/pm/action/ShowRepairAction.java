package com.pm.action;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.Goods;
import com.pm.entity.Repair;
import com.pm.entity.ShowRepair;
import com.pm.entity.User;
import com.pm.service.GoodsService;
import com.pm.service.RepairService;
import com.pm.service.UserService;


public class ShowRepairAction extends ActionSupport{
	 private List<ShowRepair> showrepairs =new ArrayList<ShowRepair>();
	 private List<Repair> repairs;
	   private List<User> users;
	   private List<Goods> good;
	  private ShowRepair showrepair;
	  private int id;
	  private RepairService repairService;
	   private UserService userService;
	   private GoodsService goo;
	   
	   
	public ShowRepairAction() {
		
	}
	
	public ShowRepairAction(List<ShowRepair> showrepairs, List<Repair> repairs,
			List<User> users, List<Goods> good, ShowRepair showrepair, int id,
			RepairService repairService, UserService userService,
			GoodsService goodsService) {
		super();
		this.showrepairs = showrepairs;
		this.repairs = repairs;
		this.users = users;
		this.good = good;
		this.showrepair = showrepair;
		this.id = id;
		this.repairService = repairService;
		this.userService = userService;
		this.goo = goodsService;
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

	public List<ShowRepair> getShowrepairs() {
		return showrepairs;
	}
	public void setShowrepairs(List<ShowRepair> showrepairs) {
		this.showrepairs = showrepairs;
	}
	public ShowRepair getShowrepair() {
		return showrepair;
	}
	public void setShowrepair(ShowRepair showrepair) {
		this.showrepair = showrepair;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	
	public RepairService getRepairService() {
		return repairService;
	}
	public void setRepairService(RepairService repairService) {
		this.repairService = repairService;
	}
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

	public String findAllShowRepair() throws Exception{
		repairs = repairService.findAllRepairs();
		Iterator<Repair> repairsiter = repairs.iterator();
		while(repairsiter.hasNext())
		{
			Repair r = repairsiter.next();
			User u=userService.findById(r.getUser_id());
			System.out.println(r.getUser_id());
			Goods g= goo.findByIdGoods(r.getGoods_id());
			ShowRepair sr =new ShowRepair();
			sr.setId(r.getId());
			sr.setUser_id(r.getUser_id());
			sr.setUsername(u.getUsername());
			sr.setMobile(u.getMobile());
			sr.setBuilding_id(u.getBuilding_id());
			sr.setFloor_num(u.getFloor_num());
			sr.setRoom_num(u.getRoom_num());
			
			sr.setGoods_name(g.getGoods_name());
			sr.setRepair_time(r.getRepair_time());
			sr.setRemark(r.getRemark());
			sr.setStatus(r.getStatus());
			showrepairs.add(sr);	
			
		}
		return SUCCESS;
		
	}
	   
}
