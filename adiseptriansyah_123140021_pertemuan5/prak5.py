from abc import ABC, abstractmethod
from datetime import datetime

# ABSTRACT CLASS DAN INHERITANCE
class LibraryItem(ABC):
    def __init__(self, item_id, title, author_or_publisher):
        #ENCAPSULATION
        self._item_id = item_id      
        self._title = title          
        self._is_loaned = False
        self._author_or_publisher = author_or_publisher 
    
    @staticmethod
    def get_policy_message():
        return "Pengembalian terlambat didenda Rp5.000/hari."
    
    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, new_title):
        if isinstance(new_title, str) and len(new_title.strip()) > 0:
            self._title = new_title
        else:
            print("Judul tidak valid.")

    def borrow(self):
        """Mengubah status item menjadi dipinjam."""
        if not self._is_loaned:
            self._is_loaned = True
            return True
        return False

    def return_item(self):
        """Mengubah status item menjadi tersedia kembali."""
        if self._is_loaned:
            self._is_loaned = False
            return True
        return False

    def get_status_str(self):
        return "DIPINJAM" if self._is_loaned else "TERSEDIA"

    # Abstract Method
    @abstractmethod
    def get_details(self):
        pass

    @abstractmethod
    def item_type(self):
        pass

    def __str__(self):
        return f"[{self._item_id}] {self._title} ({self.item_type()}) | {self.get_status_str()}"

#Inheritance LibraryItem.
class Book(LibraryItem):
    def __init__(self, item_id, title, author, isbn):
        super().__init__(item_id, title, author)
        self._isbn = isbn

    #POLYMORPHISM
    def get_details(self):
        return (f"TYPE    : BUKU (ID: {self._item_id})\n"
                f"JUDUL   : {self._title}\n"
                f"PENULIS : {self._author_or_publisher}\n"
                f"ISBN    : {self._isbn}\n"
                f"STATUS  : {self.get_status_str()}")

    def item_type(self):
        return "Buku"

class Magazine(LibraryItem):
    def __init__(self, item_id, title, publisher, issue_number):
        super().__init__(item_id, title, publisher)
        self._issue_number = issue_number

    def get_details(self):
        return (f"TYPE    : MAJALAH (ID: {self._item_id})\n"
                f"JUDUL   : {self._title}\n"
                f"PENERBIT: {self._author_or_publisher}\n"
                f"EDISI   : {self._issue_number}\n"
                f"STATUS  : {self.get_status_str()}")

    def item_type(self):
        return "Majalah"

class Library:
    def __init__(self):
        #Encapsulation
        self.__collection = []
        self.__transaction_log = [] 
        
        # Data Dummy Awal
        self.add_item(Book(1, "君と綴るうたかた", "Yuama", "727"))
        self.add_item(Book(2, "親愛なる僕へ殺意をこめて", "井龍一", "333"))
        self.add_item(Magazine(3, "寿命を買い取ってもらった。一年につき、一万円で", "三秋縋", "123"))

    #Private Method
    def __log_activity(self, message):
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.__transaction_log.append(f"[{timestamp}] {message}")

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            for existing in self.__collection:
                if existing._item_id == item._item_id:
                    print(f"Gagal: ID {item._item_id} sudah ada.")
                    return
            self.__collection.append(item)
            self.__log_activity(f"New Item Added: {item.title}")
            print(f" Berhasil menambahkan: {item.title}")
        else:
            print("Item tidak valid.")

    def remove_item(self, item_id):
        for i, item in enumerate(self.__collection):
            if item._item_id == item_id:
                removed = self.__collection.pop(i)
                self.__log_activity(f"Item Removed: {removed.title}")
                print(f" Item '{removed.title}' berhasil dihapus.")
                return
        print(" ID tidak ditemukan.")

    def borrow_item_by_id(self, item_id):
        for item in self.__collection:
            if item._item_id == item_id:
                if item.borrow():
                    print(f" Berhasil meminjam: '{item.title}'")
                    self.__log_activity(f"Borrowed: {item.title}")
                else:
                    print(f" Gagal: '{item.title}' sedang dipinjam orang lain.")
                return
        print(" Item tidak ditemukan.")

    def return_item_by_id(self, item_id):
        for item in self.__collection:
            if item._item_id == item_id:
                if item.return_item():
                    print(f"Berhasil mengembalikan: '{item.title}'")
                    self.__log_activity(f"Returned: {item.title}")
                else:
                    print(f" Item '{item.title}' memang tidak sedang dipinjam.")
                return
        print(" Item tidak ditemukan.")

    def display_library(self):
        print(f"\nSEMUA KOLEKSI (Total: {len(self)})")
        if not self.__collection:
            print("(Kosong)")
        for item in self.__collection:
            print(item)
        print("-" * 40)

    def display_available_items(self):
        print(f"\nITEM TERSEDIA (Bisa Dipinjam)")
        found = False
        for item in self.__collection:
            if not item._is_loaned:
                print(item)
                found = True
        if not found:
            print("(Tidak ada item yang tersedia saat ini)")
        print("-" * 40)

    def __len__(self):
        return len(self.__collection)

def input_int(prompt):
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print(" Masukkan angka yang valid.")

if __name__ == "__main__":
    lib = Library()
    
    while True:
        print(LibraryItem.get_policy_message())
        print("-" * 40)
        print("1. Tampilkan Semua Buku/Majalah")
        print("2. Buku yang Bisa Dipinjam (Available)")
        print("3. Tambah atau Hapus Buku")
        print("4. Pinjam Buku")
        print("5. Kembalikan Buku")
        print("0. Keluar")
        print("-" * 40)
        
        pilihan = input("Pilih menu (0-5): ")

        if pilihan == "1":
            lib.display_library()

        elif pilihan == "2":
            lib.display_available_items()

        elif pilihan == "3":
            print("\n--- KELOLA BUKU ---")
            print("1. Tambah Buku")
            print("2. Tambah Majalah")
            print("3. Hapus Item")
            print("0. Kembali")
            sub_pilihan = input("Pilih: ")

            if sub_pilihan == "1":
                idx = input_int("Masukkan ID Buku (Angka): ")
                judul = input("Judul Buku: ")
                penulis = input("Penulis: ")
                isbn = input("ISBN: ")
                lib.add_item(Book(idx, judul, penulis, isbn))
            elif sub_pilihan == "2":
                idx = input_int("Masukkan ID Majalah (Angka): ")
                judul = input("Judul Majalah: ")
                penerbit = input("Penerbit: ")
                edisi = input("Edisi: ")
                lib.add_item(Magazine(idx, judul, penerbit, edisi))
            elif sub_pilihan == "3":
                idx = input_int("Masukkan ID Item yang akan dihapus: ")
                lib.remove_item(idx)

        elif pilihan == "4":
            idx = input_int("Masukkan ID Buku yang ingin dipinjam: ")
            lib.borrow_item_by_id(idx)

        elif pilihan == "5":
            idx = input_int("Masukkan ID Buku yang ingin dikembalikan: ")
            lib.return_item_by_id(idx)

        elif pilihan == "0":
            print("\nTerima kasih telah menggunakan sistem perpustakaan.")
            break
        
        else:
            print("\nPilihan tidak valid, silakan coba lagi.")