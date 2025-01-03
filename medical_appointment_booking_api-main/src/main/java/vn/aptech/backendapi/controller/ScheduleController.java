package vn.aptech.backendapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import vn.aptech.backendapi.dto.CustomSlotWithScheduleDoctorId;
import vn.aptech.backendapi.dto.Schedule.ScheduleDoctorDto;
import vn.aptech.backendapi.dto.Schedule.ScheduleWithDepartmentDto;
import vn.aptech.backendapi.service.Schedule.ScheduleService;
import vn.aptech.backendapi.service.ScheduleDoctor.ScheduleDoctorSerivce;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/schedules", produces = MediaType.APPLICATION_JSON_VALUE)
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private ScheduleDoctorSerivce scheduleDoctorSerivce;

    @GetMapping(value = "/getdays", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Object[]>> findAllOnlyDay() {
        List<Object[]> result = scheduleService.findAllOnlyDay();
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/schedule-doctor/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ScheduleDoctorDto> findScheduleDoctorById(@PathVariable("id") int id){
            ScheduleDoctorDto scheduleDoctor = scheduleDoctorSerivce.findDoctorIdById(id).get();
            if(scheduleDoctor != null){
                return ResponseEntity.ok(scheduleDoctor);
            }else {
                return ResponseEntity.noContent().build();
            }
    }

    @GetMapping(value = "findschedulebyday/{day}")
    public ResponseEntity<ScheduleWithDepartmentDto> findScheduleByDay(@PathVariable("day") String day) {
        ScheduleWithDepartmentDto result = scheduleService.getDepartmentsWithSlotsAndDoctors(LocalDate.parse(day));
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping(value = "/doctor/{doctorId}/day/{dayWorking}")
    public ResponseEntity<List<CustomSlotWithScheduleDoctorId>> findByDayWorkingAndDoctorId(
            @PathVariable("doctorId") int doctorId,
            @PathVariable("dayWorking") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayWorking) {
        List<CustomSlotWithScheduleDoctorId> result = scheduleService.findSlotsByDayAndDoctorId(dayWorking, doctorId);
        if (!result.isEmpty()) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/create/{day}/{departmentId}")
    public ResponseEntity<?> create(
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayWorking,
            @PathVariable("departmentId") int departmentId,
            @RequestBody int[] slotsId) {
        boolean result = scheduleService.create(dayWorking, departmentId, slotsId);
        if (result) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();

    }

    @DeleteMapping(value = "/deleteslot/{day}/{departmentId}/{slotId}")
    public ResponseEntity<?> deleteSlot(
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayWorking,
            @PathVariable("departmentId") int departmentId,
            @PathVariable("slotId") int slotId) {
        boolean result = scheduleService.deleteSlot(dayWorking, departmentId, slotId);
        if (result) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.notFound().build();

    }

    @PutMapping(value = "/updatelistschedule/{day}/{departmentId}/{slotId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateScheduleForAdmin(
            @PathVariable("day") String day,
            @PathVariable("departmentId") int departmentId,
            @PathVariable("slotId") int slotId,

            @RequestBody int[] doctorList) {
        try {
            scheduleService.updateScheduleForAdmin(LocalDate.parse(day), departmentId, slotId, doctorList);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã xảy ra lỗi khi cập nhật lịch: " + e.getMessage());
        }
    }

    @PostMapping(value = "/checkcreate/{day}/{departmentid}/{doctorid}/{slotid}")
    public ResponseEntity<?> checkCreate(
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayWorking,
            @PathVariable("departmentid") int departmentId,
            @PathVariable("doctorid") int doctorId,
            @PathVariable("slotid") int slotId) {
        boolean result = scheduleDoctorSerivce.create(dayWorking, departmentId, doctorId, slotId);

        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/checkdelete/{day}/{departmentid}/{doctorid}/{slotid}")
    public ResponseEntity<?> checkDelete(
            @PathVariable("day") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dayWorking,
            // @PathVariable("day") String dayWorking,
            @PathVariable("departmentid") int departmentId,
            @PathVariable("doctorid") int doctorId,
            @PathVariable("slotid") int slotId) {
        boolean result = scheduleDoctorSerivce.delete(dayWorking, departmentId, doctorId, slotId);
        if (result) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
