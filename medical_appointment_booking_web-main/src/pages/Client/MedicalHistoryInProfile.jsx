import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://medical-history-api.example.com/api/history"; 

function MedicalHistoryInProfile() {
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(API_URL);
        setHistory(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu lịch sử y tế.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lịch sử khám bệnh</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item.id}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedHistory(item)}
          >
            <span className="font-medium">{item.date}</span> - {item.diagnosis}
          </li>
        ))}
      </ul>

      {selectedHistory && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold">Chi tiết khám bệnh</h3>
          <p><strong>Ngày:</strong> {selectedHistory.date}</p>
          <p><strong>Chuẩn đoán:</strong> {selectedHistory.diagnosis}</p>
          <p><strong>Bác sĩ:</strong> {selectedHistory.doctor}</p>
          <p><strong>Ghi chú:</strong> {selectedHistory.notes}</p>
          <button
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setSelectedHistory(null)}
          >
            Đóng
          </button>
        </div>
      )}
    </div>
  );
}

export default MedicalHistoryInProfile;
