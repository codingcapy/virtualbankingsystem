import { createFileRoute } from "@tanstack/react-router";
import { LeftNav } from "../components/LeftNav";
import { TopNav } from "../components/TopNav";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <div className="pt-25 pl-62.5 mx-auto">
        <div className="flex border-l border-t border-r border-[#a0a0a0] bg-gray-200">
          <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
            Profile #
          </div>
          <div className="w-[200px] p-2 border-r border-r-[#a0a0a0]">
            First name
          </div>
          <div className="w-[200px] p-2 border-r border-r-[#a0a0a0]">
            Middle name
          </div>
          <div className="w-[200px] p-2 border-r border-r-[#a0a0a0]">
            Last name
          </div>
          <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
            Date of birth
          </div>
          <div className="w-[225px] p-2 border-r border-r-[#a0a0a0]">Email</div>
          <div className="w-[100px] p-2">Phone #</div>
        </div>
        <div className="border border-[#a0a0a0] h-[500px] overflow-y-auto ">
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
          <div className="flex border-b border-[#a0a0a0] cursor-pointer hover:bg-blue-300 transition-all ease-in-out duration-300">
            <div className="w-[100px] p-2 border-r border-r-[#a0a0a0]">
              1234567890
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              SuperlongfirstnameSuperlongfirstname
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlongmiddlename
            </div>
            <div className="w-[200px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              Superlonglastname
            </div>
            <div className="w-[125px] p-2 border-r border-r-[#a0a0a0]">
              01-01-1990
            </div>
            <div className="w-[225px] p-2 border-r border-r-[#a0a0a0] overflow-x-hidden">
              superlongemail@gmail.com
            </div>
            <div className="w-[100px] p-2 overflow-x-hidden">1234567890</div>
          </div>
        </div>
      </div>
    </div>
  );
}
