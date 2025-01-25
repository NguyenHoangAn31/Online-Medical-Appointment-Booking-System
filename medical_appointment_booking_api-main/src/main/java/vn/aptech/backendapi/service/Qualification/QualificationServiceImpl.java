package vn.aptech.backendapi.service.Qualification;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aptech.backendapi.dto.QualificationDto;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.entities.Qualification;
import vn.aptech.backendapi.repository.DoctorRepository;
import vn.aptech.backendapi.repository.QualificationRepository;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QualificationServiceImpl implements QualificationService {
    @Autowired
    private QualificationRepository qualificationRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private ModelMapper mapper;
    @Override
    public List<QualificationDto> findByDoctorId(int doctorId) {
        List<Qualification> qualifications = qualificationRepository.findByDoctorId(doctorId);
        return qualifications.stream().map(this::toDto).collect(Collectors.toList());
    }
    private QualificationDto toDto(Qualification s) {
        QualificationDto q = mapper.map(s, QualificationDto.class);
        q.setDoctor_id(s.getDoctor().getId());
        q.setCourse(s.getCourse());
        q.setUniversityName(s.getUniversityName());
        q.setDegreeName(s.getDegreeName());
        return q;
    }
    @Override
    public List<QualificationDto> findAll() {
        List<Qualification> slots = qualificationRepository.findAll();
        return slots.stream().map(this::toDto)
                .collect(Collectors.toList());
    }
    @Override
    public Optional<QualificationDto> findById(int id) {
        Optional<Qualification> result = qualificationRepository.findById(id);
        return result.map(this::toDto);
    }
    @Override
    public QualificationDto save(QualificationDto dto) {
        Qualification q = mapper.map(dto, Qualification.class);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (dto.getUniversityName() != null && dto.getUniversityName().length()>0) {
            String universityName = dto.getUniversityName();
            q.setUniversityName(universityName);
        }
        if (dto.getCourse() != null && dto.getCourse().length()>0) {
            String course = dto.getCourse();
            q.setCourse(course);
        }
        if (dto.getDegreeName() != null && dto.getDegreeName().length()>0) {
            String degreeName = dto.getDegreeName();
            q.setDegreeName(degreeName);
        }
        if (dto.getDoctor_id() > 0) {
            Optional<Doctor> d = doctorRepository.findById(dto.getDoctor_id());
            d.ifPresent(doctor -> q.setDoctor(mapper.map(d, Doctor.class)));
        }
        Qualification result = qualificationRepository.save(q);
        return toDto(result);
    }
    @Override
    public boolean deleteById(int id) {
        try {
            qualificationRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
