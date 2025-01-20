package vn.aptech.backendapi.service.Doctor;

import vn.aptech.backendapi.dto.CustomDoctorForEdit;
import vn.aptech.backendapi.dto.DoctorDto;

import java.util.List;
import java.util.Optional;

public interface DoctorService {
    List<DoctorDto> findAll();
    Optional<DoctorDto> findById(int id);
    Optional<DoctorDto> findByUserId1(int userId);
    Optional<DoctorDto> findByUserId(int userId);
    //Hien Create 30/4/2024
    List<DoctorDto> findDoctorsByDepartmentId(int departmentId);
    // writed by An in 5/11
    DoctorDto updatePriceAndDepartment(int id , double price , int departmentId);
    List<DoctorDto> findAllWithAllStatus();
    List<DoctorDto> findDoctorsByDepartmentIdWithAllStatus(int departmentId);

    List<DoctorDto> searchDoctorsByName(String name);

    // Hien - 28/5/2024
    DoctorDto update(int id, DoctorDto doctorDto);

    boolean deleteDoctorFromDepartment(int doctorId);

    List<DoctorDto> doctorNotDepartment();

    boolean addDoctorToDepartment(int departmentId , int doctorId);

    CustomDoctorForEdit getDoctorDetail(int doctorId);
    DoctorDto editDoctor(int doctorId , CustomDoctorForEdit doctor);

}
