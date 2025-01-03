 package vn.aptech.backendapi.controller;


 import com.paypal.api.payments.Links;
 import com.paypal.api.payments.Payment;
 import com.paypal.base.rest.PayPalRESTException;
 import jakarta.servlet.http.HttpServletRequest;
 import jakarta.servlet.http.HttpServletResponse;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.web.bind.annotation.*;
 import vn.aptech.backendapi.service.Auth.PaypalService;

 import java.io.IOException;

 @RestController
 @RequestMapping("/paypal")
 public class PayPalController {

     @Autowired
     private PaypalService paypalService;

     @PostMapping("/pay")
     public String pay(@RequestParam("sum") double sum, HttpServletRequest request) {
         String cancelUrl = "http://localhost:8080/paypal/cancel";
         String successUrl = "http://localhost:8080/paypal/success";
         try {
             Payment payment = paypalService.createPayment(
                     sum,
                     "USD",
                     "paypal",
                     "sale",
                     "Payment description",
                     cancelUrl,
                     successUrl);
             for (Links link : payment.getLinks()) {
                 if (link.getRel().equals("approval_url")) {
                     return link.getHref();
                 }
             }
         } catch (PayPalRESTException e) {
             e.printStackTrace();
         }
         return "redirect:/";
     }



     @GetMapping("/success")
     public void successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId, HttpServletResponse response) {
         try {
             Payment payment = paypalService.executePayment(paymentId, payerId);
             if (payment.getState().equals("approved")) {
                 response.sendRedirect("http://localhost:5173/proccess-payment?status=success");
                 return;
             }
         } catch (PayPalRESTException | IOException e) {
             e.printStackTrace();
         }
         try {
             response.sendRedirect("http://localhost:5173/proccess-payment?status=failed");
         } catch (IOException e) {
             e.printStackTrace();
         }
     }

     @GetMapping("/cancel")
     public void cancelPay(HttpServletResponse response) throws IOException {
         response.sendRedirect("http://localhost:5173/proccess-payment?status=failed");
     }
 }
