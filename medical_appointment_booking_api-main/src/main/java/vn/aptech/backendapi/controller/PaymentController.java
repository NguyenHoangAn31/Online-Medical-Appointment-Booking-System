 package vn.aptech.backendapi.controller;

 import jakarta.servlet.http.HttpServletRequest;
 import jakarta.servlet.http.HttpServletResponse;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.MediaType;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;
 import vn.aptech.backendapi.config.PaymentConfiguration;
 import vn.aptech.backendapi.dto.PaymentResDto;

 import java.io.IOException;
 import java.io.UnsupportedEncodingException;
 import java.net.URLEncoder;
 import java.nio.charset.StandardCharsets;
 import java.text.SimpleDateFormat;
 import java.util.*;

 @RestController
 @RequestMapping("/api/payment")
 public class PaymentController {
     @GetMapping(value = "/create_payment_url", produces = MediaType.APPLICATION_JSON_VALUE)
     public ResponseEntity<?> createPayment(
             @RequestParam  String amount,
             @RequestParam  String orderType,
             @RequestParam  String returnUrl,
             HttpServletRequest request
     ) throws UnsupportedEncodingException {
         String vnp_Version = "2.1.0";
         String vnp_Command = "pay";
         String bankCode = "NCB";
         String vnp_TxnRef = PaymentConfiguration.getRandomNumber(8);
         String vnp_IpAddr = "127.0.0.1";
         System.out.println(amount);
         String vnp_TmnCode = PaymentConfiguration.vnp_TmnCode;

         Map<String, String> vnp_Params = new HashMap<>();
         vnp_Params.put("vnp_Version", vnp_Version);
         vnp_Params.put("vnp_Command", vnp_Command);
         vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
         vnp_Params.put("vnp_Amount", String.valueOf(Integer.parseInt(amount) * 100));
         vnp_Params.put("vnp_CurrCode", "VND");
         if (bankCode != null && !bankCode.isEmpty()) {
             vnp_Params.put("vnp_BankCode", bankCode);
         }
         vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
         vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
         vnp_Params.put("vnp_OrderType", orderType);
         vnp_Params.put("vnp_Locale", "vn");
         vnp_Params.put("vnp_ReturnUrl", returnUrl);
         vnp_Params.put("vnp_IpAddr", vnp_IpAddr);


         Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
         SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
         String vnp_CreateDate = formatter.format(cld.getTime());
         vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

         cld.add(Calendar.MINUTE, 9);
         String vnp_ExpireDate = formatter.format(cld.getTime());
         vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

         List fieldNames = new ArrayList(vnp_Params.keySet());
         Collections.sort(fieldNames);
         StringBuilder hashData = new StringBuilder();
         StringBuilder query = new StringBuilder();
         Iterator itr = fieldNames.iterator();
         while (itr.hasNext()) {
             String fieldName = (String) itr.next();
             String fieldValue = (String) vnp_Params.get(fieldName);
             if ((fieldValue != null) && (fieldValue.length() > 0)) {
                 //Build hash data
                 hashData.append(fieldName);
                 hashData.append('=');
                 hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                 //Build query
                 query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                 query.append('=');
                 query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                 if (itr.hasNext()) {
                     query.append('&');
                     hashData.append('&');
                 }
             }
         }
         String queryUrl = query.toString();
         String vnp_SecureHash = PaymentConfiguration.hmacSHA512(PaymentConfiguration.secretKey, hashData.toString());
         queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
         String paymentUrl = PaymentConfiguration.vnp_PayUrl + "?" + queryUrl;

         PaymentResDto paymentResDto = new PaymentResDto();
         paymentResDto.setStatus("Ok");
         paymentResDto.setMessage("Successfully");
         paymentResDto.setURL(paymentUrl);
         return ResponseEntity.status(HttpStatus.OK).body(paymentResDto);
     }

     @GetMapping("/vn-pay-callback")
     public void payCallbackHandler(HttpServletRequest request, HttpServletResponse response) throws IOException {
         String status = request.getParameter("vnp_ResponseCode");
         if ("00".equals(status)) {
             response.sendRedirect("http://localhost:5173/proccess-payment?status=success");
         } else {
             response.sendRedirect("http://localhost:5173/proccess-payment?status=failed");
         }
     }

     @GetMapping(value = "/return", produces = MediaType.APPLICATION_JSON_VALUE)
     public ResponseEntity<Map<String, String>> paymentReturn(HttpServletRequest request) {
         // Xử lý kết quả trả về từ VNPay
         String status = request.getParameter("vnp_ResponseCode");
         Map<String, String> responseMap = new HashMap<>();
         if ("00".equals(status)) {
             responseMap.put("status", "success");
         } else {
             responseMap.put("status", "failed");
         }

         return ResponseEntity.ok(responseMap);
     }

 }
