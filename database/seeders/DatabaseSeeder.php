<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * Sediakan data dummy pada Halaman Customer Marketing lebih dari 11 dan customer prospect & closing di Sales lebih dari 11
     */
    public function run()
    {
        $jumlahMarketing = 12;
        $jumlahSales = 22;
        $password = 'aabecede123';
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'super@super.com',
            'username' => str('Super Admin')->slug('_'),
            'roles' => 'super-admin',
            'password' => $password
        ]);

        $faker = Faker::create();
        #marketing
        foreach (range(1, $jumlahMarketing) as $index) {
            $name = $faker->name;
            User::create([
                'name' => $name,
                'email' => $faker->unique()->safeEmail,
                'username' => str($name)->slug('_'),
                'roles' => 'marketing',
                'password' => $password,
                'created_by' => $superAdmin->id,
            ]);
        }
        foreach (range(1, $jumlahSales) as $index) {
            $name = $faker->name;
            $userMarketing = User::where('roles', 'marketing')->get()->pluck('id')->toArray();
            User::create([
                'name' => $name,
                'email' => $faker->unique()->safeEmail,
                'username' => str($name)->slug('_'),
                'roles' => 'sales',
                'password' => $password,
                'created_by' => $faker->randomElement($userMarketing),
            ]);
        }

        $salesId = User::where('roles', 'sales')->get()->pluck('id')->toArray();
        foreach (range(1, 100) as $key) {
            $createdAt = Carbon::instance($faker->dateTimeBetween('-6 month', 'now'));
            Customer::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->unique()->phoneNumber(),
                'address' => $faker->address(),
                'sales_id' => $faker->randomElement($salesId),
                'metode_ketemu' => $faker->randomElement(Customer::$metodeKetemu),
                'status_ketertarikan' => $faker->randomElement(Customer::$statusKetertarikan),
                'created_at' => $createdAt,
            ]);
        }

        foreach (range(1, 100) as $key) {
            $createdAt = Carbon::instance($faker->dateTimeBetween('-6 month', 'now'));
            Customer::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'phone' => $faker->unique()->phoneNumber(),
                'address' => $faker->address(),
                'sales_id' => $faker->randomElement($salesId),
                'metode_ketemu' => $faker->randomElement(Customer::$metodeKetemu),
                'status_ketertarikan' => 'CLOSING',
                'created_at' => $createdAt,
                'closing_at' => Carbon::parse($createdAt)->addDay(10),
            ]);
        }

    }
}
