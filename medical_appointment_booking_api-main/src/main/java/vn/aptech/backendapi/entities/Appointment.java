package vn.aptech.backendapi.entities;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "scheduledoctor_id", "clinic_hours" })
})
public class Appointment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "partient_id", referencedColumnName = "id")
    private Partient partient;

    @ManyToOne
    @JoinColumn(name = "scheduledoctor_id", referencedColumnName = "id")
    private ScheduleDoctor scheduledoctor;
    private int price;
    private String payment;
    private String status;
    private String note;
    @Column(name = "appointment_date")
    private LocalDate appointmentDate;
    @Column(name = "medical_examination_day")
    private LocalDate medicalExaminationDay;
    @Column(name = "clinic_hours")
    private LocalTime clinicHours;
    private String reason;
}
