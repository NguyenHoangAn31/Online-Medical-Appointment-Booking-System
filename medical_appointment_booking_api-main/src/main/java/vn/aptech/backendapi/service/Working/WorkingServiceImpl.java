package vn.aptech.backendapi.service.Working;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.aptech.backendapi.dto.WorkingDto;
import vn.aptech.backendapi.entities.Doctor;
import vn.aptech.backendapi.entities.Working;
import vn.aptech.backendapi.repository.DoctorRepository;
import vn.aptech.backendapi.repository.WorkingRepository;

@Service
public class WorkingServiceImpl implements WorkingService {

    @Autowired
    private WorkingRepository workingRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper mapper;

    // Hien Create 30/4/2024
    @Override
    public List<WorkingDto> findByDoctorId(int doctorId) {
        List<Working> workings = workingRepository.findByDoctorId(doctorId);
        return workings.stream().map(this::toDto).collect(Collectors.toList());
    }

    private WorkingDto toDto(Working s) {
        WorkingDto w = mapper.map(s, WorkingDto.class);
        w.setDoctor_id(s.getDoctor().getId());
        w.setStartWork(s.getStartWork().toString());
        w.setEndWork(s.getEndWork().toString());
        return w;
    }

    @Override
    public List<WorkingDto> findAll() {
        List<Working> slots = workingRepository.findAll();
        return slots.stream().map(this::toDto)
                .collect(Collectors.toList());
    }


    @Override
    public Optional<WorkingDto> findById(int id) {
        Optional<Working> result = workingRepository.findById(id);
        return result.map(this::toDto);
    }

    @Override
    public WorkingDto save(WorkingDto dto) {

        Working w = mapper.map(dto, Working.class);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        if (dto.getStartWork() != null && dto.getStartWork().length()>0) {
            String startWork = dto.getStartWork();
            LocalDate startWorkDate = LocalDate.parse(startWork, formatter);
            w.setStartWork(startWorkDate);
        }
        if (dto.getEndWork() != null && dto.getStartWork().length()>0) {
            String endtWork = dto.getEndWork();
            LocalDate endtWorkDate = LocalDate.parse(endtWork, formatter);
            w.setEndWork(endtWorkDate);
        }

        if (dto.getDoctor_id() > 0) {
            Optional<Doctor> d = doctorRepository.findById(dto.getDoctor_id());
            d.ifPresent(doctor -> w.setDoctor(mapper.map(d, Doctor.class)));
        }
        
        Working result = workingRepository.save(w);
        return toDto(result);
    }

    @Override
    public boolean deleteById(int id) {
        try {
            workingRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
