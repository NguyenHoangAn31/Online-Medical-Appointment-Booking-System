package vn.aptech.backendapi.service.Qualification;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.aptech.backendapi.dto.QualificationDto;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.entities.Qualification;
import vn.aptech.backendapi.repository.DoctorRepository;
import vn.aptech.backendapi.repository.QualificationRepository;

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
        return qualificationRepository.findByDoctorId(doctorId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<QualificationDto> findAll() {
        return qualificationRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<QualificationDto> findById(int id) {
        return qualificationRepository.findById(id).map(this::toDto);
    }

    @Override
    public QualificationDto save(QualificationDto dto) {
        Qualification q = mapper.map(dto, Qualification.class);

        if (isNotEmpty(dto.getUniversityName())) {
            q.setUniversityName(dto.getUniversityName());
        }
        if (isNotEmpty(dto.getCourse())) {
            q.setCourse(dto.getCourse());
        }
        if (isNotEmpty(dto.getDegreeName())) {
            q.setDegreeName(dto.getDegreeName());
        }
        if (dto.getDoctor_id() > 0) {
            doctorRepository.findById(dto.getDoctor_id()).ifPresent(q::setDoctor);
        }

        Qualification result = qualificationRepository.save(q);
        return toDto(result);
    }

    @Override
    public QualificationDto update(int id, QualificationDto dto) {
        Optional<Qualification> existingQualification = qualificationRepository.findById(id);
        if (existingQualification.isPresent()) {
            Qualification q = existingQualification.get();

            if (isNotEmpty(dto.getUniversityName())) {
                q.setUniversityName(dto.getUniversityName());
            }
            if (isNotEmpty(dto.getCourse())) {
                q.setCourse(dto.getCourse());
            }
            if (isNotEmpty(dto.getDegreeName())) {
                q.setDegreeName(dto.getDegreeName());
            }
            if (dto.getDoctor_id() > 0) {
                doctorRepository.findById(dto.getDoctor_id()).ifPresent(q::setDoctor);
            }

            Qualification updatedQualification = qualificationRepository.save(q);
            return toDto(updatedQualification);
        }
        return null;
    }

    @Override
    public boolean deleteById(int id) {
        if (qualificationRepository.existsById(id)) {
            qualificationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private QualificationDto toDto(Qualification q) {
        QualificationDto dto = mapper.map(q, QualificationDto.class);
        dto.setDoctor_id(q.getDoctor().getId());
        return dto;
    }

    private boolean isNotEmpty(String str) {
        return str != null && !str.trim().isEmpty();
    }
}
