package vn.aptech.backendapi.service.Qualification;

import vn.aptech.backendapi.dto.QualificationDto;

import java.util.List;
import java.util.Optional;

public interface QualificationService {
    List<QualificationDto> findByDoctorId(int doctorId);
    List<QualificationDto> findAll();
    Optional<QualificationDto> findById(int id);
    QualificationDto save(QualificationDto dto);
    boolean deleteById(int id);
}
