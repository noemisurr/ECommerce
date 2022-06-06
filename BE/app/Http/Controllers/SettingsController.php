<?php

namespace App\Http\Controllers;

use App\Models\Settings;
use App\Models\SettingsHome;
use Database\Seeders\SettingsSeeder;
use Exception;
use Illuminate\Http\Request;

class SettingsController extends Controller
{

    public function getContact() {
        return response(Settings::all(), 200);
    }

    public function updateContact(Request $request, $id)
    {
        $data = $request->all();
        $setting = Settings::find($id);
        if (!isset($setting)) return response(['message' => 'settings not found'], 404);
        if (isset($data['email'])) $setting->email = $data['email'];
        if (isset($data['address'])) $setting->address = $data['address'];
        if (isset($data['city'])) $setting->city = $data['city'];
        if (isset($data['postal_code'])) $setting->postal_code = $data['postal_code'];
        if (isset($data['telephone'])) $setting->telephone = $data['telephone'];

        try {
            $setting->save();
            return response($setting, 200);
        } catch (Exception $exc) {
            return response(['message' => 'settings not updated'], 500);
        }
    }

    public function getMedia() {
        return response(SettingsHome::all(), 200);
    }

    public function createMedia(Request $request) {
        $data = $request->all();
        try {
            $createdMedia = SettingsHome::create([
                'name' => $data['name'],
                'url' => $data['url'],
                'alt' => $data['alt'],
                'size' => $data['size'],
                'id_position' => $data['id_position']
            ]);
            return response($createdMedia, 201);
        }catch(Exception $exc) {
            return response(['message' => 'media not created'], 500);
        }
    }

    public function updateMedia(Request $request, $id)
    {
        $data = $request->all();
        $setting = SettingsHome::find($id);
        if (!isset($setting)) return response(['message' => 'settings not found'], 404);
        if (isset($data['name'])) $setting->name = $data['name'];
        if (isset($data['src'])) $setting->src = $data['src'];
        if (isset($data['alt'])) $setting->alt = $data['alt'];
        if (isset($data['size'])) $setting->size = $data['size'];
        if (isset($data['id_position'])) $setting->size = $data['id_position'];

        try {
            $setting->save();
            return response($setting, 200);
        } catch (Exception $exc) {
            return response(['message' => 'settings not updated'], 500);
        }
    }

    public function deleteMedia(Request $request, $id) {
        $media = SettingsHome::find($id);
        if(!isset($media) || empty($media)) return response(['message' => 'media not found'], 404);

        try {
            $media->delete();
            return response($media, 200);
        } catch ( Exception $exc ) {
            return response(['message' => 'media not deleted'], 500);
        }
    }

}
