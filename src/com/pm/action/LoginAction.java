package com.pm.action;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.List;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;

import com.opensymphony.xwork2.ActionSupport;
import com.pm.entity.AdminAccess;
import com.pm.entity.AdminUser;
import com.pm.service.AdminAccessService;
import com.pm.service.AdminUserService;

public class LoginAction extends ActionSupport implements ServletRequestAware,ServletResponseAware{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private AdminUser au;
	private String username;
	private AdminUserService adminUserService;
	private HttpServletRequest request;
	private HttpServletResponse response;
	private AdminAccessService aacService;
	private List<AdminAccess> aacs;
	
	public AdminAccessService getAacService() {
		return aacService;
	}
	public void setAacService(AdminAccessService aacService) {
		this.aacService = aacService;
	}
	public List<AdminAccess> getAacs() {
		return aacs;
	}
	public void setAacs(List<AdminAccess> aacs) {
		this.aacs = aacs;
	}
	public HttpServletRequest getRequest() {
		return request;
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	public HttpServletResponse getResponse() {
		return response;
	}
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	
	public AdminUserService getAdminUserService() {
		return adminUserService;
	}
	public void setAdminUserService(AdminUserService adminUserService) {
		this.adminUserService = adminUserService;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public AdminUser getAu() {
		return au;
	}
	public void setAu(AdminUser au) {
		this.au = au;
	}
	
	private Color getRandColor(int fc, int bc) {// 给定范围获得随机颜色
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}
	
	public String execute() throws Exception {
		response.setContentType("image/jpeg");
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		HttpSession session = request.getSession();
		// 在内存中创建图象
		int width = 70, height = 23;
		BufferedImage image = new BufferedImage(width, height,BufferedImage.TYPE_INT_RGB);
		// 获取图形上下文
		Graphics g = image.getGraphics();
		// 生成随机类
		Random random = new Random();
		// 设定背景色
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		// 设定字体
		g.setFont(new Font("Times New Roman", Font.PLAIN, 24));
		// 画边框
		g.setColor(getRandColor(160, 200));
		g.drawRect(0, 0, width - 1, height - 1);
		// 随机产生155条干扰线，使图象中的认证码不易被其它程序探测到
		g.setColor(getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}
		// 取随机产生的认证码(4位数字)
		String sRand = "";
		for (int i = 0; i < 4; i++) {
			String rand = String.valueOf(random.nextInt(10));
			sRand += rand;
			// 将认证码显示到图象中
			g.setColor(new Color(20 + random.nextInt(110), 20 + random
					.nextInt(110), 20 + random.nextInt(110)));
			// 调用函数出来的颜色相同，可能是因为种子太接近，所以只能直接生成
			g.drawString(rand, 13 * i + 14, 20);
		}

		// 将认证码存入session
		session.setAttribute("verifyCode", sRand);

		// 图象生效
		g.dispose();
		// 输出图象到页面
		ImageIO.write(image, "JPEG", response.getOutputStream());
		return null;
	}
	
	public String Login(){
		String flag = request.getParameter("is_remember");
		System.out.println(au.getUsername());
		System.out.println(au.getPassword());
		String verifyCode = (String) request.getSession().getAttribute("verifyCode");
		String verifyCode_check = request.getParameter("verifyCode");
		au = adminUserService.login(au);
		if(au == null){
			return ERROR;
		}else{
			HttpSession session = ServletActionContext. getRequest().getSession();
			/*登录的管理员的权限ID存到session*/
			session.setAttribute  ("access_id", au.getAccess_id());
			System.out.println("权限ID:"+session.getAttribute("access_id"));
			if(verifyCode.equals(verifyCode_check)){
				if ("y".equals(flag)) {
		             //创建两个Cookie对象
		             Cookie nameCookie = new Cookie("username", au.getUsername());
		             //设置Cookie的有效期为3天
		             nameCookie.setMaxAge(60 * 60 * 24 * 3);
		             Cookie pwdCookie = new Cookie("password", au.getPassword());
		             pwdCookie.setMaxAge(60 * 60 * 24 * 3);
		             response.addCookie(nameCookie);
		             response.addCookie(pwdCookie);
		         }
				request.getSession().setAttribute("access_id", au.getAccess_id());
				return SUCCESS;
			}else{
				return ERROR;
			}
		}
	}
	/*@SkipValidation
	public String logout(){
		if(session.getAttribute("loginUserName")!=null){
			session.removeAttribute("loginUserName");
		}
		return "logout_success";
	}*/
	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}
	
	//@Override
	/*public void validate() {
		
		if("".equals(auser.getUsername().trim())){
			this.addFieldError("usernameError", "用户名不能为空");
		}
		if(auser.getPassword().length()<6){
			this.addFieldError("pwdError", "密码必须是6-16位");
		}
	}*/
}
