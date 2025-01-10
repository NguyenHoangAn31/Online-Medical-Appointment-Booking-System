package vn.aptech.backendapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StatisticalDto {
    private int revenueToday;
    private int percnetRevenue;
    private int patientsToday;
    private int percentPatients;
    private int bookingsToday;
    private int percentBookings;
    private int clientsToday;
    private int percentClients;
}
