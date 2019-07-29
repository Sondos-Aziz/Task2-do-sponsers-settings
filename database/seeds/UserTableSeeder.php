<?php

use App\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $person =  User::create([
            'password'=>bcrypt('123123'),
            'firstName' => 'سندس',
            'secondName' => 'عبد العزيز',
            'thirdName' => 'محمد',
            'fourthName' => 'أبو حرب',
            'governorate' =>'غرب غزة',
            'city' =>'غزة',
            'neighborhood' =>'حي النصر',
            'address' =>'غزة النصر عمارة الملش3',
            'phone1' =>'2865581',
            'phone2' =>'54897',
            'type'=> 'شخصي',
            'mobile' =>'059987515',
            'email' =>'sh@gmail.com',
            'nationality' =>'فلسطينية',
            'countryOfResidence' =>'فلسطين',
            'identificationNum' =>'35486634',
            'definitionType' =>'هوية',
            'contactPerson' =>'محمد',
        ]);
    }
}