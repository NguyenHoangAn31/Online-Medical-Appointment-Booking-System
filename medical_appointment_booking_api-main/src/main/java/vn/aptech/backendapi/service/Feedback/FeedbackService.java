package vn.aptech.backendapi.service.Feedback;

import java.util.List;

import vn.aptech.backendapi.dto.DoctorDto;
import vn.aptech.backendapi.dto.Feedback.FeedbackDto;

public interface FeedbackService {
    FeedbackDto save(FeedbackDto dto);
    DoctorDto feedbackDetail(int doctorId);

    List<FeedbackDto> feedbackDetailDoctorId(int doctorId);

    boolean deleteById(int id);
    boolean changeStatus(int id,int status);

}

