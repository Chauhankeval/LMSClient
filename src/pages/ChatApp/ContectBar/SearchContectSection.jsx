import { useSearchContectsMutation } from "@/Features/api/authApi";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSelectedContact } from "@/Features/chatSlice";
import { useNavigate } from "react-router-dom";

const SearchContectSection = () => {
  const [searchContect, setSearchContect] = useState([]); // State for search results

  const [searchContects] = useSearchContectsMutation();
  const SearchContect = async (searchTerm) => {
    console.log("<<searchTerm", searchTerm);
    try {
      const result = await searchContects({ searchTerm });

      if (result?.data?.contacts) {
        setSearchContect(result?.data?.contacts);
      } else {
        setSearchContect([]);
        toast("No contacts found.");
      }
    } catch (error) {
      console.log(error);
      toast("Error fetching contacts. Please try again.");
    }
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const selectNewContact = (contact) => {
    console.log(contact);
    dispatch(setSelectedContact(contact));
  };

  return (
    <div>
      <div className="flex items-center p-2 rounded-lg mb-4 gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          placeholder="Search your contact"
          onChange={(e) => SearchContect(e.target.value)}
          className="rounded-lg p-3 bg-[#2c2e3b] border-none w-full"
        />
      </div>

      {/* If contacts are found */}
      {searchContect.length > 0 && (
        <ScrollArea className="h-[250px]">
          <div className="flex flex-col gap-5">
            {searchContect.map((contact) => (
              <div
                key={contact._id}
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => selectNewContact(contact)}
              >
                {/* Avatar Section */}
                <div className="w-12 h-12 relative">
                  <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                    {contact.photoUrl ? (
                      <AvatarImage
                        src={contact.photoUrl}
                        alt="profile"
                        className="object-cover w-full h-full bg-black rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-gray-300 rounded-full text-gray-700 font-bold text-lg">
                        {contact.name
                          ? contact.name.charAt(0).toUpperCase()
                          : contact.email.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </Avatar>
                </div>

                {/* Contact Name and Email */}
                <div className="flex flex-col">
                  <span className="font-medium">{contact.name}</span>
                  <span className="text-xs text-gray-500">{contact.email}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default SearchContectSection;
