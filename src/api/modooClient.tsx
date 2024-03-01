"use client";

import axios from "axios";

const apiClient = axios.create();
apiClient.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
apiClient.defaults.headers.put["Content-Type"] = "application/json";
apiClient.defaults.headers.common["Content-Type"] = "application/json";

export default apiClient;
