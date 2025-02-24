import axios from "axios"

// Tabloların tüm adlarını almak için kullanılan fonksiyon
export async function getAllTableName(dataSource) {
   try {
      // API'ye GET isteği gönderilir
      const response = await axios.get(`http://localhost:8080/getAllTableNames/${dataSource}`);
      // Eğer HTTP yanıt kodu 200 veya 201 değilse, hata mesajı yazdırılır
      if (response.status !== 200 && response.status !== 201) {
         console.error("getAllTableNames status error", response.status)
         return;
      };
      // API'den gelen yanıtın 'result' kısmını döndürür
      return response?.data?.result

   } catch (error) {
      console.error("getAllTableNames error", error)
   }
}

// Belirli bir tablonun alan isimlerini almak için kullanılan fonksiyon
export async function getAllFieldNames(dataSource, tableName) {
   try {
      // API'ye, tablo ismini içeren GET isteği gönderilir
      const response = await axios.get(`http://localhost:8080/getAllFieldName/${dataSource}/${tableName}`);
      // Eğer HTTP yanıt kodu 200 veya 201 değilse, hata mesajı yazdırılır
      if (response.status !== 200 && response.status !== 201) {
         console.error("getAllFieldName status error", response.status)
         return;
      };
      // API'den gelen veriyi döndürür (alan isimleri)
      return response.data;
   } catch (error) {
      console.error("getAllTableNames error", error)
   }
}
// Sistemde tanımlı jobların tamamını almak için kullanılan fonksiyon
export async function getAllScheduledConfig() {
   try {
      // API'ye GET isteği gönderilir
      const response = await axios.get('http://localhost:8080/getAllScheduledConfigs');
      // Eğer HTTP yanıt kodu 200 veya 201 değilse, hata mesajı yazdırılır
      if (response.status !== 200 && response.status !== 201) {
         console.error("getAllScheduledConfig status error", response.status)
      }
      // API'den gelen jobların tamamını döndürür
      return response.data;
   } catch (error) {
      console.error("getAllScheduledConfig error", error)
   }
}


// Yeni bir job oluşturmak veya var olan job güncellemek için kullanılan fonksiyon
export async function saveScheduledConfig(data) {
   try {
      // API'ye POST isteği gönderilir, gönderilecek veri 'data' parametresidir
      const response = await axios.post(`http://localhost:8080/saveScheduledConfig`, data)
      // Eğer HTTP yanıt kodu 200 veya 201 değilse, hata mesajı yazdırılır
      if (response.status !== 200 && response.status !== 201) {
         console.error("postSubmit status error", response.status)
         return false;
      };
      // Job başarılı bir şekilde kaydedildiyse true döndürülür.
      return true;
   } catch (error) {
      console.error("saveScheduledConfig error", error)
   }
}
