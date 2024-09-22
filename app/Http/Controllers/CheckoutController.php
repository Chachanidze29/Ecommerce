<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidateShippingRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class CheckoutController extends Controller
{
    public function index() {
        return Inertia::render('Checkout/Index');
    }

    public function validateShippingInformation(ValidateShippingRequest $request) {
        $request->validated();
    }

    public function processPayment(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'shipping_first_name' => 'required|string|max:255',
            'shipping_last_name' => 'required|string|max:255',
            'payment_method_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => 1099,
                'currency' => 'usd',
                'payment_method' => $request->payment_method_id,
                'confirmation_method' => 'manual',
                'confirm' => true,
            ]);

            return $this->generateResponse($paymentIntent);
        } catch (ApiErrorException $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function generateResponse($intent)
    {
        if ($intent->status == 'requires_action' &&
            $intent->next_action->type == 'use_stripe_sdk') {
            return response()->json([
                'requires_action' => true,
                'payment_intent_client_secret' => $intent->client_secret,
            ]);
        } elseif ($intent->status == 'succeeded') {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => 'Invalid PaymentIntent status'], 500);
        }
    }
}
