import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://medical-history-api.example.com/api/history";

function MedicalHistoryInProfile() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setHistory(response.data);
      setFilteredHistory(response.data);
    } catch (err) {
      setError("Không thể tải dữ liệu lịch sử y tế.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredHistory(history);
    } else {
      setFilteredHistory(
        history.filter((item) =>
          item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, history]);

  if (loading) return <div className="text-center p-4">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lịch sử khám bệnh</h2>

      {/* Ô tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm theo chuẩn đoán..."
        className="p-2 border rounded w-full mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Nút tải lại */}
      <button
        onClick={fetchHistory}
        className="mb-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Tải lại
      </button>

      <ul className="space-y-2">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <li
              key={item.id}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedHistory(item)}
            >
              <span className="font-medium">{item.date}</span> - {item.diagnosis}
            </li>
          ))
        ) : (
          <p className="text-gray-500">Không tìm thấy lịch sử phù hợp.</p>
        )}
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
