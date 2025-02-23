package vn.aptech.backendapi.service.Feedback;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import vn.aptech.backendapi.dto.DoctorDto;
import vn.aptech.backendapi.dto.Feedback.FeedbackDto;
import vn.aptech.backendapi.dto.PatientDto;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.entities.Feedback;
import vn.aptech.backendapi.entities.Partient;
import vn.aptech.backendapi.repository.DoctorRepository;
import vn.aptech.backendapi.repository.FeedbackRepository;
import vn.aptech.backendapi.repository.PartientRepository;
import vn.aptech.backendapi.service.Doctor.DoctorService;
import vn.aptech.backendapi.service.Patient.PatientService;

@Slf4j
@Service
public class FeedbackServiceImpl implements FeedbackService {
    @Autowired
    private ModelMapper mapper;

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PartientRepository partientRepository;
    @Autowired
    private PatientService patientService;
    @Autowired
    private DoctorService doctorService;

    private FeedbackDto toCreateDto(Feedback f) {
        FeedbackDto feedback = mapper.map(f, FeedbackDto.class);
        feedback.setDoctorId(f.getDoctor().getId());
        feedback.setPatientId(f.getPartient().getId());
        return feedback;
    }

    private FeedbackDto toFeedbackDto(Feedback f) {
        FeedbackDto feedback = mapper.map(f, FeedbackDto.class);
        feedback.setPatientId(f.getPartient().getId());
        feedback.setDoctorId(f.getDoctor().getId());
        feedback.setCreatedAt(f.getCreatedAt().toString());
        feedback.setPatient(patientService.getPatientByPatientId(f.getPartient().getId()).orElse(null));

        return feedback;
    }

    public List<FeedbackDto> findList(int doctorId) {
        return feedbackRepository.findListByDoctorId(doctorId)
                .stream()
                .map(this::toFeedbackDto)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorDto feedbackDetail(int doctorId) {
        return doctorService.findById(doctorId)
                .map(doctor -> {
                    doctor.setFeedbackDtoList(findList(doctorId));
                    return doctor;
                }).orElse(null);
    }

    @Override
    public List<FeedbackDto> feedbackDetailDoctorId(int doctorId) {
        return feedbackRepository.findAllByDoctorId(doctorId)
                .stream()
                .map(this::convertToDto)
                .sorted((f1, f2) -> Integer.compare((int) f2.getRate(), (int) f1.getRate()))
                .collect(Collectors.toList());
    }

    private FeedbackDto convertToDto(Feedback feedback) {
        FeedbackDto dto = mapper.map(feedback, FeedbackDto.class);
        PatientDto patientDto = mapper.map(feedback.getPartient(), PatientDto.class);
        dto.setPatient(patientDto);
        return dto;
    }

    @Override
    public boolean deleteById(int id) {
        if (feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
            return true;
        } else {
            log.warn("Feedback với ID {} không tồn tại", id);
            return false;
        }
    }

    @Override
    public boolean changeStatus(int id, int status) {
        return feedbackRepository.findById(id).map(feedback -> {
            feedback.setStatus(status != 1);
            feedbackRepository.save(feedback);
            return true;
        }).orElse(false);
    }

    @Override
    public FeedbackDto save(FeedbackDto dto) {
        Feedback f = mapper.map(dto, Feedback.class);

        doctorRepository.findById(dto.getDoctorId()).ifPresent(f::setDoctor);
        partientRepository.findById(dto.getPatientId()).ifPresent(f::setPartient);

        Feedback result = feedbackRepository.save(f);
        return toCreateDto(result);
    }
}
