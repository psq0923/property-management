package com.pm.action;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.AdminUser;
import com.pm.entity.Complain;
import com.pm.entity.User;
import com.pm.service.AdminUserService;
import com.pm.service.ComplainService;
import com.pm.service.UserService;
import com.pm.service.impl.ComplainServiceImpl;

public class ComplainAction extends ActionSupport {

	private Complain complain;
	private ComplainService complainService;;

	public ComplainService getComplainservice() {
		return complainService;
	}

	public void setComplainService(ComplainService complainService) {
		this.complainService = complainService;
	}

	public Complain getComplain() {
		return complain;
	}

	public void setComplain(Complain complain) {
		this.complain = complain;
	}

	@Override
	public String execute() throws Exception {
		System.out.println("进入action 测试id");
		
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		int user_id=(Integer) session.getAttribute("user_id");
		System.out.println("action 测试id"+session.getAttribute("user_id"));
		complain.setUser_id(user_id);
		complain.setContent(complain.getContent());
		
		complain.setAdmin_id(complain.getAdmin_id());
		
		/*Timestamp ts = new Timestamp(System.currentTimeMillis());获取当前时间戳*/
		Date date = new Date();// 创建一个时间对象，获取到当前的时间
		System.out.println( "创建一个时间对象，获取到当前的时间"+new Date());
		/*SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");// 设置时间显示格式
		String str =sdf.format(date);// 将当前时间格式化为需要的类型
		*/
		complain.setComp_time(date);
		//complain.setBack_info(complain.getBack_info());
		complainService.save(complain);
		return SUCCESS;
	}
}
