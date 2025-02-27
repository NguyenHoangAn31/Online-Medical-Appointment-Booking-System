package vn.aptech.backendapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import vn.aptech.backendapi.dto.Feedback.FeedbackDto;
import vn.aptech.backendapi.service.Feedback.FeedbackService;

@RestController
@RequestMapping(value = "/api/feedback")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    // Lấy tất cả feedbacks
    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FeedbackDto>> findAll() {
        List<FeedbackDto> result = feedbackService.findAll();
        return ResponseEntity.ok(result);
    }

    // Lấy feedback theo ID
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FeedbackDto> findById(@PathVariable("id") int id) {
        FeedbackDto result = feedbackService.findById(id);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.notFound().build();
    }

    // Lấy danh sách feedback theo doctorId
    @GetMapping(value = "/doctor/{doctorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FeedbackDto>> findFeedbackByDoctorId(@PathVariable("doctorId") int doctorId) {
        List<FeedbackDto> result = feedbackService.feedbackDetailDoctorId(doctorId);
        return result.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(result);
    }

    // Tạo feedback mới
    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FeedbackDto> create(@RequestBody FeedbackDto dto) {
        FeedbackDto result = feedbackService.save(dto);
        return result != null ? ResponseEntity.ok(result) : ResponseEntity.badRequest().build();
    }

    // Cập nhật feedback
    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FeedbackDto> updateFeedback(@PathVariable("id") int id, @RequestBody FeedbackDto dto) {
        FeedbackDto updated = feedbackService.update(id, dto);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Thay đổi trạng thái feedback
    @PutMapping(value = "/changestatus/{id}/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> changeStatusFeedback(@PathVariable("id") int id, @PathVariable("status") int status) {
        boolean changed = feedbackService.changeStatus(id, status);
        return changed ? ResponseEntity.ok("Status updated successfully") : ResponseEntity.notFound().build();
    }

    // Xóa feedback
    @DeleteMapping(value = "/delete/{feedbackId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteFeedback(@PathVariable("feedbackId") int feedbackId) {
        boolean deleted = feedbackService.deleteById(feedbackId);
        return deleted ? ResponseEntity.ok("Feedback deleted successfully") : ResponseEntity.notFound().build();
    }
}
