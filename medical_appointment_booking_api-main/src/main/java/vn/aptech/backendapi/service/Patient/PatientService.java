package vn.aptech.backendapi.service.Patient;

import vn.aptech.backendapi.dto.CustomPatientForEdit;
import vn.aptech.backendapi.dto.MedicalDto;
import vn.aptech.backendapi.dto.CustomPatientEditDto;

import vn.aptech.backendapi.dto.PatientDto;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface PatientService {
    Optional<PatientDto> getPatientByUserId(int userId);

    // writed by An in 5/6
    Optional<PatientDto> getPatientByPatientId(int patientId);

    // writed by An in 5/11
    List<PatientDto> getAll();

    List<PatientDto> findPatientsByScheduleDoctorIdAndStartTime(int scheduledoctorid, LocalTime starttime);

    List<PatientDto> findPatientsByDoctorIdAndFinishedStatus(int doctorId);

    CustomPatientForEdit getPatientDetail(int userId);

    CustomPatientEditDto getPatientDetail01(int userId);

    boolean editPatient(int userId, CustomPatientForEdit dto);

    boolean editPatient01(int userId, CustomPatientEditDto dto);

    boolean Create(int userId, CustomPatientForEdit dto);

    // Hien 23/6/2024
    List<MedicalDto> getMedicalHistoryByPatientId(Integer patientId);

}
